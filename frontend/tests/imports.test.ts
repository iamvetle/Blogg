
describe("testing imports", () => {
    test("imports are working fine", async () => {
        const cmp = await import('../components/TheFeed.vue')
        expect(cmp).toBeDefined()
    })
})