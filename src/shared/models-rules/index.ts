import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  return request.user && request.user.id;
}

export function getUserIdFromBody(body: any): string {
  return body.user_id && body.user.id;
}
