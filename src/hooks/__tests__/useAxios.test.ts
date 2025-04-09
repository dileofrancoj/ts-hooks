import { renderHook } from "@testing-library/react";
// axios-mock-adapter
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

import { useAxios } from "../useAxios";

describe('useAxios', () => {
    it('throw error if config is undefined', () => {
        try {
            const config = undefined
            // @ts-expect-error I want to test this usecase
            renderHook(() => useAxios(config))
        } catch(error) {
            expect(error).toBeInstanceOf(Error)
            // @ts-expect-error error is an instance of Error
            expect(error.message).toBe('useAxios must be initialized with config parameters')
        }
    })
    it('Throw error if instance is undefined', () => {
        try {
            const config = {url: '/some-url', method: 'get', enabled: true}
            // @ts-expect-error I want to test this usecase
            renderHook(() => useAxios(config))
        } catch(error) {
            expect(error).toBeInstanceOf(Error)
            // @ts-expect-error error is an instance of Error
            expect(error.message).toBe('useAxios must be initialized with an instance')
        }
    })
    it('useAxios throw an error when HTTP request fails', async () => {
        const mock = new AxiosMockAdapter(axios) // pasarle una instancia de axios existente
        mock.onGet('/some-endpoint').reply(500)
        const config = {
                instance: axios, url: '/some-endpoint', method: 'get', enabled: true, 
                callbacks : {onErrorCallback: vi.fn()}
        }
        // @ts-expect-error check axios method
        const {result} = renderHook(() => useAxios(config))
        await vi.waitFor(() => {
            expect(result.current.loading).toBe(false)
            expect(config.callbacks.onErrorCallback).toHaveBeenCalled()
            expect(result.current.error).toBe('Ocurrió un error Error: Request failed with status code 500')
        })

    })
    it('useAxios fetch data and update state', async () => {
        const mock = new AxiosMockAdapter(axios) // pasarle una instancia de axios existente

        mock.onGet('/v2/some-endpoint').reply(200, {data: 'mock data'})
        const config = {
            instance: axios, url: '/v2/some-endpoint', method: 'get', enabled: true, 
            callbacks : {onErrorCallback: vi.fn(), onSuccessCallback: vi.fn()}
    }

    // @ts-expect-error check axios method
    const {result} = renderHook(() => useAxios(config))
    await vi.waitFor(() => {
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBe('')
        expect(config.callbacks.onSuccessCallback).toHaveBeenCalled()
        expect(result.current.data).toEqual({data: 'mock data'})
    })
    })
})