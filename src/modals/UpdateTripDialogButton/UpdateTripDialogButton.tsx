import { Dialog } from "@kobalte/core/dialog";
import { JSX, createSignal } from "solid-js";

import createTrip from "../../api/trips/createTrip";
import updateTrip from "../../api/trips/updateTrip";
import { Trip } from "../../types";

type UpdateTripDialogProps = {
  onUpdated: () => void;
  triggerButton?: JSX.Element;
  trip?: Trip;
};

const UpdateTripDialogButton = (props: UpdateTripDialogProps) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [title, setTitle] = createSignal(props.trip?.title ?? "");
  const [isCreating, setIsCreating] = createSignal(false);

  const onSubmit = async (evt: Event) => {
    evt.preventDefault();
    setIsCreating(true);
    if (props.trip) {
      await updateTrip({ id: props.trip.id, values: { title: title() } });
    } else {
      await createTrip({ title: title() });
    }
    setTitle("");
    setIsCreating(false);

    props.onUpdated();
  };

  return (
    <Dialog open={isOpen()} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger>{props.triggerButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black bg-opacity-50" />
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Content class="z-50 w-full max-w-xl bg-white shadow-md">
            <div class="flex items-center justify-between px-10 pb-3 pt-10">
              <Dialog.Title class="text-2xl text-neutral-900">
                Add Location
              </Dialog.Title>
              <Dialog.CloseButton class="dialog__close-button">
                Close
              </Dialog.CloseButton>
            </div>
            <div class="px-10 pb-10 pt-3">
              <Dialog.Description class="sr-only text-base text-neutral-600">
                Add a location to your trip.
              </Dialog.Description>
              <form class="flex w-1/2 gap-2" onSubmit={onSubmit}>
                <input
                  class="input_text grow"
                  on:change={(evt) => setTitle(evt.currentTarget.value)}
                  type="text"
                  value={title()}
                />
                <button
                  class="btn_primary"
                  disabled={isCreating()}
                  type="submit"
                >
                  {isCreating() ? (
                    <span>Creating...</span>
                  ) : (
                    <span>Create</span>
                  )}
                </button>
              </form>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
};

export default UpdateTripDialogButton;
