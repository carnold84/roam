import { Dialog } from "@kobalte/core/dialog";
import { JSX, createSignal } from "solid-js";

import createTripLocation from "../../api/trips/createTripLocation";
import DatePicker from "../../components/DatePicker";
import Input from "../../components/Input";
import { CreateTripLocation, Trip } from "../../types";
import getDaysFrom from "../../utils/getDaysFrom";
import serializeForm from "../../utils/serializeForm";

type CreateDialogProps = {
  onCreated: () => void;
  triggerButton?: JSX.Element;
  trip: Trip;
};

const UpdateLocationDialog = (props: CreateDialogProps) => {
  console.log(props.trip.locations);
  const [isOpen, setIsOpen] = createSignal(false);
  const [isCreating, setIsCreating] = createSignal(false);
  const lastLocation = props.trip.locations[-1];
  const [startDate, setStartDate] = createSignal(
    lastLocation?.end_at || getDaysFrom({ numDays: 1 }),
  );
  const [endDate, setEndDate] = createSignal(
    getDaysFrom({ date: startDate(), numDays: 1 }),
  );

  const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    evt,
  ) => {
    evt.preventDefault();
    const data = serializeForm<CreateTripLocation>(evt.currentTarget);
    const tripId = props.trip.id;
    if (tripId) {
      setIsCreating(true);
      await createTripLocation({ ...data, trip_id: tripId });
      setIsOpen(false);
      setIsCreating(false);
      props.onCreated();
    }
  };

  return (
    <Dialog open={isOpen()} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Dialog.Trigger class="btn_primary">{props.triggerButton}</Dialog.Trigger>
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
              <form class="flex flex-col gap-4" on:submit={onSubmit}>
                <Input label="Name" name="name" required={true} type="text" />
                <DatePicker
                  label="Start"
                  name="start_at"
                  on:change={(evt) => setStartDate(evt.currentTarget.value)}
                  required={true}
                  value={startDate()}
                />
                <DatePicker
                  label="End"
                  name="end_at"
                  on:change={(evt) => setEndDate(evt.currentTarget.value)}
                  required={true}
                  value={endDate()}
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

export default UpdateLocationDialog;
