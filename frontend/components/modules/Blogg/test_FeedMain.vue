<template>
  <div data-test="everything" class="w-full">
    <div id="top-search">
      <FeedTopSearch />
    </div>

    <div id="top-choice">
      <FeedTopChoice v-if="postStore.posts && postStore.posts?.results" />
    </div>
    <div id="posts-list">
      <Suspense>
        <template #default>
          <FeedPostsList class="w-full mt-12" />
        </template>
        <template #fallback>
          <span>loading</span>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/store/postStore';

const postStore = usePostStore();
</script>

<script>
import { render, screen } from '@testing-library/vue';
import FeedMain from './FeedMain.vue';

describe('FeedMain', () => {
  it('renders all components', () => {
    render(FeedMain);

    expect(screen.getByTestId('everything')).toBeInTheDocument();
    expect(screen.getByTestId('top-search')).toBeInTheDocument();
    expect(screen.getByTestId('top-choice')).toBeInTheDocument();
    expect(screen.getByTestId('posts-list')).toBeInTheDocument();
  });

  it('renders loading state when posts are not available', () => {
    render(FeedMain, {
      data() {
        return {
          postStore: {
            posts: null,
          },
        };
      },
    });

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('renders FeedTopChoice when posts are available', () => {
    render(FeedMain, {
      data() {
        return {
          postStore: {
            posts: {
              results: [],
            },
          },
        };
      },
    });

    expect(screen.getByTestId('top-choice')).toBeInTheDocument();
  });
});
</script>describe('FeedMain', () => {
  it('renders all components', () => {
    render(FeedMain);

    expect(screen.getByTestId('everything')).toBeInTheDocument();
    expect(screen.getByTestId('top-search')).toBeInTheDocument();
    expect(screen.getByTestId('top-choice')).toBeInTheDocument();
    expect(screen.getByTestId('posts-list')).toBeInTheDocument();
  });

  it('renders loading state when posts are not available', () => {
    render(FeedMain, {
      data() {
        return {
          postStore: {
            posts: null,
          },
        };
      },
    });

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('renders FeedTopChoice when posts are available', () => {
    render(FeedMain, {
      data() {
        return {
          postStore: {
            posts: {
              results: [],
            },
          },
        };
      },
    });

    expect(screen.getByTestId('top-choice')).toBeInTheDocument();
  });
});