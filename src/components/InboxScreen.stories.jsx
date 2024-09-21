import { Provider } from "react-redux";
import InboxScreen from "./InboxScreen";
import store from "../lib/store";
import { MockedState } from "./TaskList.stories";
import { http, HttpResponse } from "msw";
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"],
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          () => {
            return HttpResponse.json(MockedState.tasks);
          }
          // (req, res, ctx) => {
          //   console.log("MockedState.tasks", MockedState.tasks);
          //   if (MockedState && MockedState.tasks) {
          //     return res(ctx.status(200), ctx.json(MockedState.tasks));
          //   } else {
          //     return res(
          //       ctx.status(500),
          //       ctx.json({ error: "Tasks data is undefined" })
          //     );
          //   }
          //   // return res(ctx.json(MockedState.tasks));
          // }
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
    await waitFor(async () => {
      await fireEvent.click(canvas.getByLabelText("pinTask-1"));
      await fireEvent.click(canvas.getByLabelText("pinTask-3"));
      await fireEvent.click(canvas.getByLabelText("archiveTask-5"));
    });
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.status(403));
          }
        ),
      ],
    },
  },
};
