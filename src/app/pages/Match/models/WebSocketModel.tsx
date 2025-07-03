export interface Loggoing {
    code: "NOTIFICATION" | "ERROR" | "WARNING" | "LOGGING"
    data: any
}