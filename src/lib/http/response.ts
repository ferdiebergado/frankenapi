export interface ApiResponse {
  ok: boolean
  message: string
  data?: Record<string, any>
  errors?: Record<string, any>[]
}
