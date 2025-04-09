// dependencia useAxios --> axios

/**
 * 
 * Preguntas:
    - Recibimos la instancia de axios como prop o vive dentro del hook (importamos) --> 
    - Como configuramos las peticiones
        - metodo (enum)
        - url
        - config
            - headers: {}
            - timeout
            - active / enabled // activado en la etapa de montaje (true)
            - politica de retries
            - interceptors + errors handlers
                -- 500: onErrorCallback()
        - fetcher --> sirve para ejecutar peticiones manuales y reactivas. Aquellas que no deben ejecutarse en la etapa de montaja (login)

    interceptor --> 500
        cuando se ejecuta? Cuando hay un error 500
        El usuario de la lib tiene que decirme que hacer / ejecutar cuando esta ese error
*/

import { AxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from "axios";
import * as React from 'react'
import useDeepCompareEffect from "use-deep-compare-effect";

import { setCommonHeaders } from "../utils/setHeaders";

interface CallbacksProps {
    onErrorCallback?: () => void
    onSuccessCallback?: () => void
    onUnauthorizedCallback?: () => void
}
interface Config extends AxiosRequestConfig {
    instance: AxiosInstance
    method: Method // propio de AxiosRequestConfig
    timeout?: number
    enabled?: boolean // false si no quiero que se haga la request en la etapa de montaje (login, input)
    callbacks: CallbacksProps
}



type Error = string | AxiosError
type Data<T> = T | null
// Que devuelve el hook?
interface UseAxios<T> {
    data: Data<T>
    error: Error
    loading: boolean
    fetcher?: (config: Config) => Promise<T | undefined>
}

/*
    Quiero cargar un componente de login que traiga un carousel de peliculas más populares
    Cuando cargo el componente --> ejecuta una peticion para traer las peliculas mas populares (v1/populars) (get, ep)
    Cuando el usuario se loguea --> deberia ejecutar el fetcher que le pegue a /v1/login [POST] (post, ep2)
*/

const DEFAULT_TIMEOUT = 5_000
const DEFAULT_ABORT_MESSAGE = 'TIMEOUT'

export const useAxios = <T>(config: Config): UseAxios<T> => {
    // config === undefined
    if(config === undefined) throw new Error('useAxios must be initialized with config parameters')
    if(config.instance === undefined) throw new Error('useAxios must be initialized with an instance')
    const configRef = React.useRef(config)
    const { instance } = configRef.current
    // React.useReducer
    const [response, setResponse] = React.useState<Data<T>>(null)
    const [error,setError] = React.useState<Error>('')
    const [loading, setLoading] = React.useState<boolean>(config.enabled ?? false)
    setCommonHeaders(instance)

    function newAbortSignal(timeout: number) {
        const abortController = new AbortController()
        setTimeout(() => abortController.abort(DEFAULT_ABORT_MESSAGE), timeout)
        return abortController.signal
    }

    // useInterceptors({instance, callbacks})
    React.useEffect(() => {
        const requestInterceptor = instance.interceptors.response.use((response) => {
            console.log('me voy a ejecutar siempre que axios responda')
            if(response.status === 200) {
                if(config?.callbacks?.onSuccessCallback) {
                    config.callbacks.onSuccessCallback()
                }
            }
            return response
            }, async (error) => {
                if(error.response.status === 500) {
                    if(config?.callbacks?.onErrorCallback) {
                        config.callbacks.onErrorCallback()
                    }
                }
                if(error.response.status === 401) {
                    if(config?.callbacks?.onUnauthorizedCallback) {
                        config.callbacks.onUnauthorizedCallback()
                    }
                }
                return await Promise.reject(error)
            })
            return () => {
                instance.interceptors.response.eject(requestInterceptor)
            }
    }, [])

    function errorHandler(e: unknown): void {
        if(e instanceof AxiosError) {
            setError(e.message)
        } else {
            setError('Ocurrió un error ' + e)
        }
    }
    const fetch = async (config: Config) => {
        try {
            const enabled = config.enabled
            if(!enabled) return
            // setLoading(true)
            const res = await instance.request<T>({
                ...config,
                method: config.method.toLowerCase(),
                headers: {
                    ...config.headers
                },
                signal: newAbortSignal(config.timeout ?? DEFAULT_TIMEOUT)
                // signal
            })
            setResponse(res.data)
        } catch (e) {
            errorHandler(e)
        } finally {
            setLoading(false)
        }
    }

    // OJO! Vuelve a ejecutarse el efecto cuando cambia un elemento del array de dependencias (primitivos)
    // https://github.com/kentcdodds/use-deep-compare-effect/blob/main/src/__tests__/index.ts
    useDeepCompareEffect(() => {
        fetch(configRef.current)
    }, [config])

    const fetcher = async (_config: Config) => {
        try {
            setLoading(true)
            const response = await instance.request<T>({
                ...configRef.current,
                headers: {
                    ..._config.headers
                },
                signal: newAbortSignal(_config.timeout ?? DEFAULT_TIMEOUT),
                ..._config
            })
            return response.data
        } catch (e) {
            errorHandler(e)
        } finally {
            setLoading(false)
        }
    }
    return {
        data: response,
        error, 
        loading,
        fetcher
    }
}


// const {fetcher} = useAxios({url: 'http://dummy-service/login', callbacks: {onErrorCallback : () => {console.log('do something')}})

// const {data} = fetcher({, method: 'POST' }})