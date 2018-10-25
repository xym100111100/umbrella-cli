import { stringify } from 'qs';

export async function list() {
    return request(`/pfm-svr/pfm/sys`);
}
