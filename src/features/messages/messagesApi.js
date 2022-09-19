import { io } from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
    }),

    addMessage: builder.mutation({
      query: (data) => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const addMessageResult = dispatch(
          apiSlice.util.updateQueryData(
            'getMessages',
            arg.conversationId,
            (draft) => {
              console.log(JSON.stringify(draft));
            }
          )
        );

        try {
          const messages = await queryFulfilled;
          console.log(messages);
        } catch (error) {
          addMessageResult.undo();
          console.log(error);
        }
      },

      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   // create socket
      //   const socket = io(process.env.REACT_APP_API_URL, {
      //     reconnectionDelay: 1000,
      //     reconnection: true,
      //     reconnectionAttemps: 10,
      //     transports: ['websocket'],
      //     agent: false,
      //     upgrade: false,
      //     rejectUnauthorized: false,
      //   });

      //   try {
      //     await cacheDataLoaded;
      //     socket.on('message', (data) => {
      //       console.log(data);

      //       // updateCachedData((draft) => {
      //       //   console.log("updateCachedData")
      //       //   console.log('data: ', JSON.stringify(draft));
      //       //   draft.unshift(data.data);
      //       // });
      //     });
      //   } catch (err) {
      //     console.error(err);
      //   }

      //   await cacheEntryRemoved;
      //   socket.close();
      // },
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
