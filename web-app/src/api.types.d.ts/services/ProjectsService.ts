/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_Project } from '../models/models_Project';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectsService {
    /**
     * List all projects
     * @returns models_Project OK
     * @throws ApiError
     */
    public static getProjects(): CancelablePromise<Array<models_Project>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects',
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Create a new project
     * @param project Project payload
     * @returns models_Project Created
     * @throws ApiError
     */
    public static postProjects(
        project: models_Project,
    ): CancelablePromise<models_Project> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects',
            body: project,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
}
