import { beforeEach, vi } from "vitest"

beforeEach(() => {
    vi.stubGlobal("useRoute", () => {
        return null
    })
    vi.stubGlobal("useRouter", () => {
        return null
    })
    vi.stubGlobal("defineOptions", () => {
        return null
    })
    vi.stubGlobal("definePageMeta", () => {
        return null
    })
})
