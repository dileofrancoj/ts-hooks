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
            - timout
            - active / enabled
            - politica de retries
            - interceptors + errors handlers
        - fetcher --> sirve para ejecutar peticione manuales y reactivas. Aquellas que no deben ejecutarse en la etapa de montaja (login)

    interceptor --> 500
        cuando se ejecuta? Cuando hay un error 500
        El usuario de la lib tiene que decirme que hacer / ejecutar cuando esta ese error
*/

import { AxiosError, type AxiosInstance, type AxiosRequestConfig, type Method } from "axios";
import * as React from 'react'

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


// Que devuelve el hook?
interface UseAxios<T> {
    data: T
    error: Error
    loading: boolean
    fetcher?: (config: Config) => Promise<T | undefined>
}

/*
    Quiero cargar un componente de login que traiga un carousel de peliculas más populares
    Cuando cargo el componente --> ejecuta una peticion para traer las peliculas mas populares (v1/populars) (get, ep)
    Cuando el usuario se loguea --> deberia ejecutar el fetcher que le pegue a /v1/login [POST] (post, ep2)



*/
