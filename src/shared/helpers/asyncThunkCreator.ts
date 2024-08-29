import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/store';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const asyncThunkCreator = <TParams extends unknown, TResp>(
    id: string,
    urlOrUrlFactory: string | ((params: TParams) => string),
    method: HttpMethod = 'get',
) => {
    return createAsyncThunk<TResp, TParams, ThunkConfig<string>>(
        id,
        async (params: TParams, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;
            const url = typeof urlOrUrlFactory === 'string' ? urlOrUrlFactory : urlOrUrlFactory(params);
            let response;
            try {
                switch (method) {
                case 'get':
                    response = await extra.api.get<TResp>(url);
                    break;
                case 'post':
                    response = await extra.api.post<TResp>(url, params);
                    break;
                case 'put':
                    response = await extra.api.put<TResp>(url, params);
                    break;
                case 'delete':
                    response = await extra.api.delete<TResp>(url);
                    break;
                case 'patch':
                    response = await extra.api.patch<TResp>(url, params);
                    break;
                default:
                    response = await extra.api.get<TResp>(url);
                    break;
                }

                if (!response || !response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e: any) {
                return rejectWithValue(e.response.data);
            }
        },
    );
};
