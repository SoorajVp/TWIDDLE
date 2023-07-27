/* eslint-disable @typescript-eslint/no-unsafe-return */

import { api } from "../instance";

export const apiCalls = {
    adminLogin: async (payload: object) => {
        const response = await api.post("auth/admin/login", payload);
        return response.data;
      },
}