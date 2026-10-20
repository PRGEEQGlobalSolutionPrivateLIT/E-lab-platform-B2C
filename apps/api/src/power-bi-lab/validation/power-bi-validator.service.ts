import { Injectable } from '@nestjs/common';

import { LabChecksService } from '../../labs/lab-checks.service.js';
import { evaluatePowerBIRule, getPowerBIRuleMessage } from './power-bi-rules.js';
import type {
  PowerBIValidationResult,
  PowerBIValidationRule,
  PowerBIValidationSummary,
  PowerBIWorkspaceState,
} from './power-bi-validation.types.js';

@Injectable()
export class PowerBIValidatorService {
  constructor(private readonly labChecks: LabChecksService) {}

  async validateWorkspace(problemSlug: string, workspace: PowerBIWorkspaceState): Promise<PowerBIValidationSummary> {
    const [rules, config] = await Promise.all([
      this.labChecks.rules<PowerBIValidationRule>(problemSlug),
      this.labChecks.problemConfig(problemSlug),
    ]);
    const results = rules.map((rule) => this.validateRule(rule, workspace));
    const score = results.reduce((total, result) => total + result.pointsEarned, 0);
    const maxScore = results.reduce((total, result) => total + result.maxPoints, 0);
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const passedRules = results.filter((result) => result.passed).length;
    const requiredRulesPassed = results.filter((result) => result.required).every((result) => result.passed);
    const powerBi = config.powerBi && typeof config.powerBi === 'object' ? (config.powerBi as Record<string, unknown>) : {};
    const configured = Number(powerBi.passingScore ?? config.passingScore);
    const passingScore = Number.isFinite(configured) ? configured : 100;
    return {
      passed: results.length > 0 && requiredRulesPassed && percentage >= passingScore,
      score,
      maxScore,
      percentage,
      passedRules,
      failedRules: results.length - passedRules,
      totalRules: results.length,
      results,
    };
  }

  private validateRule(rule: PowerBIValidationRule, workspace: PowerBIWorkspaceState): PowerBIValidationResult {
    let passed = false;
    try {
      passed = evaluatePowerBIRule(rule, workspace);
    } catch {
      passed = false;
    }
    const maxPoints = rule.points ?? 0;
    return {
      ruleId: rule.id,
      type: rule.type,
      label: rule.label,
      passed,
      required: rule.required ?? false,
      pointsEarned: passed ? maxPoints : 0,
      maxPoints,
      message: getPowerBIRuleMessage(rule, passed),
      hint: passed ? undefined : rule.hint,
    };
  }
}