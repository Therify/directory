import { Meta, StoryObj } from "@storybook/react";
import { HelloWorld } from "./HelloWorld";

const meta: Meta<typeof HelloWorld> = {
  title: "Example/HelloWorld",
  component: HelloWorld,
};

type Story = StoryObj<typeof HelloWorld>;

export const Default: Story = {
  args: {
    language: "en",
  },
};

export default meta;
