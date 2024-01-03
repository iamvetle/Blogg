export default defineAppConfig({
    ui: {
      primary: 'customPrimary',
      gray: 'cool',
      strategy:"merge",
      notifications: {
        position: "bottom-0 top-auto"
      }
    },
    nuxtIcon: {
      size: '1.75em', // default <Icon> size applied
      class: 'icon', // default <Icon> class applied
      aliases: {
        'nuxt': 'logos:nuxt-icon',
        // For blogg
        'brand': 'solar:tornado-small-broken',
        'new-post':'solar:pen-new-square-linear',
        'my-profile':'solar:user-circle-linear',
        'register':'solar:user-plus-rounded-linear',
        'login':'solar:login-2-linear',
        'loggout':'solar:logout-2-linear',
        'user':'solar:user-rounded-linear',
        'following':'solar:users-group-rounded-linear',
        'user-profile':'solar:user-id-linear',
        'feed':'solar:full-screen-bold',
        'feed-2':'solar:window-frame-linear',
        'feed-3':'solar:infinity-bold',
        'mention':'solar:mention-circle-linear',
        'search':'solar:minimalistic-magnifer-zoom-in-linear',
        'filter':'solar:filter-linear',
        'filtered':'solar:filter-bold',
        'no-comments':'mingcute:comment-2-line',
        'has-comments':'mingcute:comment-2-fill'
      }
    }
  })

  // The primary color also has a DEFAULT shade that changes based on the theme. It is 500 in light mode and 400 in dark mode.
  