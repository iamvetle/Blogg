/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const checkIfFollowingUser: typeof import('./composables/checkIfFollowingUser')['checkIfFollowingUser']
  const checkIfLoggedInUser: typeof import('./composables/checkIfLoggedInUser')['checkIfLoggedInUser']
  const checkIfPostIsSaved: typeof import('./composables/checkIfPostIsSaved')['checkIfPostIsSaved']
  const computed: typeof import('vue')['computed']
  const constructURL: typeof import('./composables/constructURL')['constructURL']
  const createApp: typeof import('vue')['createApp']
  const customRef: typeof import('vue')['customRef']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const deleteLoggedInUserPost: typeof import('./composables/crud/deleteLoggedInUserPost')['deleteLoggedInUserPost']
  const deleteLoggedInUserProfilePicture: typeof import('./composables/crud/deleteLoggedInUserProfilePicture')['deleteLoggedInUserProfilePicture']
  const deleteSinglePostSingleComment: typeof import('./composables/crud/deleteSinglePostSingleComment')['deleteSinglePostSingleComment']
  const effectScope: typeof import('vue')['effectScope']
  const extractTitleAndContent: typeof import('./composables/extractTitleAndContent')['extractTitleAndContent']
  const fixPagination: typeof import('./composables/fixPagination')['fixPagination']
  const generateUniqueId: typeof import('./composables/generateUniqueId')['generateUniqueId']
  const getAllTags: typeof import('./composables/crud/getAllTags')['getAllTags']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getFollowUser: typeof import('./composables/crud/getFollowUser')['getFollowUser']
  const getLoggedInUserAllFollowers: typeof import('./composables/crud/getLoggedInUserAllFollowers')['getLoggedInUserAllFollowers']
  const getLoggedInUserAllFollowing: typeof import('./composables/crud/getLoggedInUserAllFollowing')['getLoggedInUserAllFollowing']
  const getLoggedInUserAllPostSnippets: typeof import('./composables/crud/getLoggedInUserAllPostSnippets')['getLoggedInUserAllPostSnippets']
  const getLoggedInUserProfile: typeof import('./composables/crud/getLoggedInUserProfile')['getLoggedInUserProfile']
  const getNormalUserPosts: typeof import('./composables/crud/getNormalUserPosts')['getNormalUserPosts']
  const getNormalUserProfile: typeof import('./composables/crud/getNormalUserProfile')['getNormalUserProfile']
  const getPostMultipleSnippet: typeof import('./composables/crud/getPostMultipleSnippet')['getPostMultipleSnippet']
  const getSaveOrUnsavePost: typeof import('./composables/crud/getSaveOrUnsavePost')['getSaveOrUnsavePost']
  const getSinglePost: typeof import('./composables/crud/getSinglePost')['getSinglePost']
  const getSinglePostComments: typeof import('./composables/crud/getSinglePostComments')['getSinglePostComments']
  const getUnfollowUser: typeof import('./composables/crud/getUnfollowUser')['getUnfollowUser']
  const h: typeof import('vue')['h']
  const horizontalRuleRun: typeof import('./composables/editorCommands')['horizontalRuleRun']
  const inject: typeof import('vue')['inject']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const markRaw: typeof import('vue')['markRaw']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const patchLoggedInUserBio: typeof import('./composables/crud/patchLoggedInUserBio')['patchLoggedInUserBio']
  const postCommentOnPost: typeof import('./composables/crud/postCommentOnPost')['postCommentOnPost']
  const postCreateNewPost: typeof import('./composables/crud/postCreateNewPost')['postCreateNewPost']
  const postForm: typeof import('./composables/crud/postForm')['postForm']
  const postProfilePicture: typeof import('./composables/crud/postProfilePicture')['postProfilePicture']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const removeImgTags: typeof import('./composables/removeImgTags')['removeImgTags']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const retrieveToken: typeof import('./composables/retrieveToken')['retrieveToken']
  const setRedoRun: typeof import('./composables/editorCommands')['setRedoRun']
  const setTokenAndUsername: typeof import('./composables/setTokenAndUsername')['setTokenAndUsername']
  const setUndoRun: typeof import('./composables/editorCommands')['setUndoRun']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const toggleBlockquoteRun: typeof import('./composables/editorCommands')['toggleBlockquoteRun']
  const toggleBoldRun: typeof import('./composables/editorCommands')['toggleBoldRun']
  const toggleBulletListRun: typeof import('./composables/editorCommands')['toggleBulletListRun']
  const toggleCodeBlockRun: typeof import('./composables/editorCommands')['toggleCodeBlockRun']
  const toggleHeadingRun: typeof import('./composables/editorCommands')['toggleHeadingRun']
  const toggleItalicRun: typeof import('./composables/editorCommands')['toggleItalicRun']
  const toggleOrderedListRun: typeof import('./composables/editorCommands')['toggleOrderedListRun']
  const toggleUnderlineRun: typeof import('./composables/editorCommands')['toggleUnderlineRun']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const useAttrs: typeof import('vue')['useAttrs']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useSlots: typeof import('vue')['useSlots']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, VNode, WritableComputedRef } from 'vue'
}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly checkIfFollowingUser: UnwrapRef<typeof import('./composables/checkIfFollowingUser')['checkIfFollowingUser']>
    readonly checkIfLoggedInUser: UnwrapRef<typeof import('./composables/checkIfLoggedInUser')['checkIfLoggedInUser']>
    readonly checkIfPostIsSaved: UnwrapRef<typeof import('./composables/checkIfPostIsSaved')['checkIfPostIsSaved']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly constructURL: UnwrapRef<typeof import('./composables/constructURL')['constructURL']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly deleteLoggedInUserPost: UnwrapRef<typeof import('./composables/crud/deleteLoggedInUserPost')['deleteLoggedInUserPost']>
    readonly deleteLoggedInUserProfilePicture: UnwrapRef<typeof import('./composables/crud/deleteLoggedInUserProfilePicture')['deleteLoggedInUserProfilePicture']>
    readonly deleteSinglePostSingleComment: UnwrapRef<typeof import('./composables/crud/deleteSinglePostSingleComment')['deleteSinglePostSingleComment']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly extractTitleAndContent: UnwrapRef<typeof import('./composables/extractTitleAndContent')['extractTitleAndContent']>
    readonly fixPagination: UnwrapRef<typeof import('./composables/fixPagination')['fixPagination']>
    readonly generateUniqueId: UnwrapRef<typeof import('./composables/generateUniqueId')['generateUniqueId']>
    readonly getAllTags: UnwrapRef<typeof import('./composables/crud/getAllTags')['getAllTags']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly getFollowUser: UnwrapRef<typeof import('./composables/crud/getFollowUser')['getFollowUser']>
    readonly getLoggedInUserAllFollowers: UnwrapRef<typeof import('./composables/crud/getLoggedInUserAllFollowers')['getLoggedInUserAllFollowers']>
    readonly getLoggedInUserAllFollowing: UnwrapRef<typeof import('./composables/crud/getLoggedInUserAllFollowing')['getLoggedInUserAllFollowing']>
    readonly getLoggedInUserAllPostSnippets: UnwrapRef<typeof import('./composables/crud/getLoggedInUserAllPostSnippets')['getLoggedInUserAllPostSnippets']>
    readonly getLoggedInUserProfile: UnwrapRef<typeof import('./composables/crud/getLoggedInUserProfile')['getLoggedInUserProfile']>
    readonly getNormalUserPosts: UnwrapRef<typeof import('./composables/crud/getNormalUserPosts')['getNormalUserPosts']>
    readonly getNormalUserProfile: UnwrapRef<typeof import('./composables/crud/getNormalUserProfile')['getNormalUserProfile']>
    readonly getPostMultipleSnippet: UnwrapRef<typeof import('./composables/crud/getPostMultipleSnippet')['getPostMultipleSnippet']>
    readonly getSaveOrUnsavePost: UnwrapRef<typeof import('./composables/crud/getSaveOrUnsavePost')['getSaveOrUnsavePost']>
    readonly getSinglePost: UnwrapRef<typeof import('./composables/crud/getSinglePost')['getSinglePost']>
    readonly getSinglePostComments: UnwrapRef<typeof import('./composables/crud/getSinglePostComments')['getSinglePostComments']>
    readonly getUnfollowUser: UnwrapRef<typeof import('./composables/crud/getUnfollowUser')['getUnfollowUser']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly horizontalRuleRun: UnwrapRef<typeof import('./composables/editorCommands')['horizontalRuleRun']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly patchLoggedInUserBio: UnwrapRef<typeof import('./composables/crud/patchLoggedInUserBio')['patchLoggedInUserBio']>
    readonly postCommentOnPost: UnwrapRef<typeof import('./composables/crud/postCommentOnPost')['postCommentOnPost']>
    readonly postCreateNewPost: UnwrapRef<typeof import('./composables/crud/postCreateNewPost')['postCreateNewPost']>
    readonly postForm: UnwrapRef<typeof import('./composables/crud/postForm')['postForm']>
    readonly postProfilePicture: UnwrapRef<typeof import('./composables/crud/postProfilePicture')['postProfilePicture']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly removeImgTags: UnwrapRef<typeof import('./composables/removeImgTags')['removeImgTags']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly retrieveToken: UnwrapRef<typeof import('./composables/retrieveToken')['retrieveToken']>
    readonly setRedoRun: UnwrapRef<typeof import('./composables/editorCommands')['setRedoRun']>
    readonly setTokenAndUsername: UnwrapRef<typeof import('./composables/setTokenAndUsername')['setTokenAndUsername']>
    readonly setUndoRun: UnwrapRef<typeof import('./composables/editorCommands')['setUndoRun']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly toValue: UnwrapRef<typeof import('vue')['toValue']>
    readonly toggleBlockquoteRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleBlockquoteRun']>
    readonly toggleBoldRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleBoldRun']>
    readonly toggleBulletListRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleBulletListRun']>
    readonly toggleCodeBlockRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleCodeBlockRun']>
    readonly toggleHeadingRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleHeadingRun']>
    readonly toggleItalicRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleItalicRun']>
    readonly toggleOrderedListRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleOrderedListRun']>
    readonly toggleUnderlineRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleUnderlineRun']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly checkIfFollowingUser: UnwrapRef<typeof import('./composables/checkIfFollowingUser')['checkIfFollowingUser']>
    readonly checkIfLoggedInUser: UnwrapRef<typeof import('./composables/checkIfLoggedInUser')['checkIfLoggedInUser']>
    readonly checkIfPostIsSaved: UnwrapRef<typeof import('./composables/checkIfPostIsSaved')['checkIfPostIsSaved']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly constructURL: UnwrapRef<typeof import('./composables/constructURL')['constructURL']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly deleteLoggedInUserPost: UnwrapRef<typeof import('./composables/crud/deleteLoggedInUserPost')['deleteLoggedInUserPost']>
    readonly deleteLoggedInUserProfilePicture: UnwrapRef<typeof import('./composables/crud/deleteLoggedInUserProfilePicture')['deleteLoggedInUserProfilePicture']>
    readonly deleteSinglePostSingleComment: UnwrapRef<typeof import('./composables/crud/deleteSinglePostSingleComment')['deleteSinglePostSingleComment']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly extractTitleAndContent: UnwrapRef<typeof import('./composables/extractTitleAndContent')['extractTitleAndContent']>
    readonly fixPagination: UnwrapRef<typeof import('./composables/fixPagination')['fixPagination']>
    readonly generateUniqueId: UnwrapRef<typeof import('./composables/generateUniqueId')['generateUniqueId']>
    readonly getAllTags: UnwrapRef<typeof import('./composables/crud/getAllTags')['getAllTags']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly getFollowUser: UnwrapRef<typeof import('./composables/crud/getFollowUser')['getFollowUser']>
    readonly getLoggedInUserAllFollowers: UnwrapRef<typeof import('./composables/crud/getLoggedInUserAllFollowers')['getLoggedInUserAllFollowers']>
    readonly getLoggedInUserAllFollowing: UnwrapRef<typeof import('./composables/crud/getLoggedInUserAllFollowing')['getLoggedInUserAllFollowing']>
    readonly getLoggedInUserAllPostSnippets: UnwrapRef<typeof import('./composables/crud/getLoggedInUserAllPostSnippets')['getLoggedInUserAllPostSnippets']>
    readonly getLoggedInUserProfile: UnwrapRef<typeof import('./composables/crud/getLoggedInUserProfile')['getLoggedInUserProfile']>
    readonly getNormalUserPosts: UnwrapRef<typeof import('./composables/crud/getNormalUserPosts')['getNormalUserPosts']>
    readonly getNormalUserProfile: UnwrapRef<typeof import('./composables/crud/getNormalUserProfile')['getNormalUserProfile']>
    readonly getPostMultipleSnippet: UnwrapRef<typeof import('./composables/crud/getPostMultipleSnippet')['getPostMultipleSnippet']>
    readonly getSaveOrUnsavePost: UnwrapRef<typeof import('./composables/crud/getSaveOrUnsavePost')['getSaveOrUnsavePost']>
    readonly getSinglePost: UnwrapRef<typeof import('./composables/crud/getSinglePost')['getSinglePost']>
    readonly getSinglePostComments: UnwrapRef<typeof import('./composables/crud/getSinglePostComments')['getSinglePostComments']>
    readonly getUnfollowUser: UnwrapRef<typeof import('./composables/crud/getUnfollowUser')['getUnfollowUser']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly horizontalRuleRun: UnwrapRef<typeof import('./composables/editorCommands')['horizontalRuleRun']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly patchLoggedInUserBio: UnwrapRef<typeof import('./composables/crud/patchLoggedInUserBio')['patchLoggedInUserBio']>
    readonly postCommentOnPost: UnwrapRef<typeof import('./composables/crud/postCommentOnPost')['postCommentOnPost']>
    readonly postCreateNewPost: UnwrapRef<typeof import('./composables/crud/postCreateNewPost')['postCreateNewPost']>
    readonly postForm: UnwrapRef<typeof import('./composables/crud/postForm')['postForm']>
    readonly postProfilePicture: UnwrapRef<typeof import('./composables/crud/postProfilePicture')['postProfilePicture']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly removeImgTags: UnwrapRef<typeof import('./composables/removeImgTags')['removeImgTags']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly retrieveToken: UnwrapRef<typeof import('./composables/retrieveToken')['retrieveToken']>
    readonly setRedoRun: UnwrapRef<typeof import('./composables/editorCommands')['setRedoRun']>
    readonly setTokenAndUsername: UnwrapRef<typeof import('./composables/setTokenAndUsername')['setTokenAndUsername']>
    readonly setUndoRun: UnwrapRef<typeof import('./composables/editorCommands')['setUndoRun']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly toValue: UnwrapRef<typeof import('vue')['toValue']>
    readonly toggleBlockquoteRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleBlockquoteRun']>
    readonly toggleBoldRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleBoldRun']>
    readonly toggleBulletListRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleBulletListRun']>
    readonly toggleCodeBlockRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleCodeBlockRun']>
    readonly toggleHeadingRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleHeadingRun']>
    readonly toggleItalicRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleItalicRun']>
    readonly toggleOrderedListRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleOrderedListRun']>
    readonly toggleUnderlineRun: UnwrapRef<typeof import('./composables/editorCommands')['toggleUnderlineRun']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}
