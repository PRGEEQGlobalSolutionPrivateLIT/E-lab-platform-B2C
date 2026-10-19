import {
  Injectable,
} from '@nestjs/common';

import {
  getPowerBIProblemConfig,
} from '../config/power-bi-problems.config.js';

import {
  evaluatePowerBIRule,
  getPowerBIRuleMessage,
} from './power-bi-rules.js';

import type {
  PowerBIProblemValidationConfig,
  PowerBIValidationResult,
  PowerBIValidationRule,
  PowerBIValidationSummary,
  PowerBIWorkspaceState,
} from './power-bi-validation.types.js';

/* =========================================================
   POWER BI VALIDATOR SERVICE
========================================================= */

@Injectable()
export class PowerBIValidatorService {
  /* =======================================================
     VALIDATE WORKSPACE
  ======================================================= */

  validateWorkspace(
    problemSlug: string,
    workspace: PowerBIWorkspaceState,
  ): PowerBIValidationSummary {
    const config =
      this.getProblemConfig(
        problemSlug,
      );

    if (!config) {
      return {
        passed: false,
        score: 0,
        maxScore: 0,
        percentage: 0,
        passedRules: 0,
        failedRules: 0,
        totalRules: 0,
        results: [],
      };
    }

    const results =
      config.rules.map(
        (
          rule:
            PowerBIValidationRule,
        ): PowerBIValidationResult =>
          this.validateRule(
            rule,
            workspace,
          ),
      );

    const score =
      results.reduce(
        (
          total: number,
          result:
            PowerBIValidationResult,
        ) =>
          total +
          result.pointsEarned,
        0,
      );

    const maxScore =
      results.reduce(
        (
          total: number,
          result:
            PowerBIValidationResult,
        ) =>
          total +
          result.maxPoints,
        0,
      );

    const percentage =
      maxScore > 0
        ? Math.round(
            (score / maxScore) *
              100,
          )
        : 0;

    const passedRules =
      results.filter(
        (
          result:
            PowerBIValidationResult,
        ) =>
          result.passed,
      ).length;

    const failedRules =
      results.length -
      passedRules;

    const requiredRulesPassed =
      results
        .filter(
          (
            result:
              PowerBIValidationResult,
          ) =>
            result.required,
        )
        .every(
          (
            result:
              PowerBIValidationResult,
          ) =>
            result.passed,
        );

    const passingScore =
      config.passingScore ?? 100;

    const passed =
      requiredRulesPassed &&
      percentage >=
        passingScore;

    return {
      passed,
      score,
      maxScore,
      percentage,
      passedRules,
      failedRules,
      totalRules:
        results.length,
      results,
    };
  }

  /* =======================================================
     VALIDATE SINGLE RULE
  ======================================================= */

  private validateRule(
    rule: PowerBIValidationRule,
    workspace: PowerBIWorkspaceState,
  ): PowerBIValidationResult {
    let passed = false;

    try {
      passed =
        evaluatePowerBIRule(
          rule,
          workspace,
        );
    } catch {
      passed = false;
    }

    const maxPoints =
      rule.points ?? 0;

    const pointsEarned =
      passed
        ? maxPoints
        : 0;

    return {
      ruleId:
        rule.id,

      type:
        rule.type,

      label:
        rule.label,

      passed,

      required:
        rule.required ?? false,

      pointsEarned,

      maxPoints,

      message:
        getPowerBIRuleMessage(
          rule,
          passed,
        ),

      hint:
        passed
          ? undefined
          : rule.hint,
    };
  }

  /* =======================================================
     GET PROBLEM CONFIG
  ======================================================= */

  private getProblemConfig(
    problemSlug: string,
  ):
    | PowerBIProblemValidationConfig
    | undefined {
    return getPowerBIProblemConfig(
      problemSlug,
    );
  }
}