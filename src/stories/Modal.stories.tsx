import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal from '../components/Modal';
import Button from '../components/Button'; // Assuming Button component is available for trigger

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the modal.',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function triggered when the modal is requested to be closed.',
    },
    title: {
      control: 'text',
      description: 'The title displayed in the modal header.',
    },
    children: {
      control: 'text',
      description: 'The content to be rendered inside the modal body.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// A common template to make modals interactive within Storybook
const InteractiveModalTemplate: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={handleClose}>
          {args.children}
        </Modal>
      </>
    );
  },
};

export const Default: Story = {
  ...InteractiveModalTemplate,
  args: {
    title: 'Default Modal Title',
    children: (
      <p>
        This is the default modal content. You can put any React nodes here.
        Click the backdrop or the close button to dismiss.
      </p>
    ),
  },
};

export const WithLongContent: Story = {
  ...InteractiveModalTemplate,
  args: {
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>
          This modal contains a long piece of content to demonstrate scrolling
          behavior.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
          illo inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
          ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
          iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
          consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
          pariatur?
        </p>
      </div>
    ),
  },
};

export const CustomButtonInContent: Story = {
  ...InteractiveModalTemplate,
  args: {
    title: 'Action Modal',
    children: (
      <div className="flex flex-col gap-4">
        <p>
          This modal demonstrates how to include custom actions within its content.
        </p>
        <Button onClick={() => alert('Action performed!')} variant="success">
          Perform Action
        </Button>
        <Button onClick={() => alert('Another action!')} variant="secondary">
          Another Action
        </Button>
      </div>
    ),
  },
};