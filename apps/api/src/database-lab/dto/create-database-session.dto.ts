export class CreateDatabaseSessionDto {
  problemSlug!: string;

  technologySlug!: string;

  mode?:
    | 'temporary'
    | 'persistent';

  projectId?: string;
}