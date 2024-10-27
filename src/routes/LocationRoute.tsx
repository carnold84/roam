import { Dialog } from "@kobalte/core/dialog";
import { useNavigate, useParams } from "@solidjs/router";
import { JSX, Show, Suspense, createResource, createSignal } from "solid-js";

import createTripLocation from "../api/trips/createTripLocation";
import getTripLocation from "../api/trips/getTripLocation";
import Input from "../components/Input";
import ArrowLeft from "../icons/ArrowLeft";
import { CreateTripLocation } from "../types";
import serializeForm from "../utils/serializeForm";

const LocationRoute = () => {
  const params = useParams();

  if (!params.locationId) {
    return null;
  }

  const [location, { refetch }] = createResource(
    params.locationId,
    getTripLocation,
  );
  const [isOpen, setIsOpen] = createSignal(false);
  const [isCreating, setIsCreating] = createSignal(false);
  const navigate = useNavigate();

  const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    evt,
  ) => {
    evt.preventDefault();
    const data = serializeForm<CreateTripLocation>(evt.currentTarget);
    setIsCreating(true);
    await createTripLocation(data);
    refetch();
    setIsOpen(false);
    setIsCreating(false);
  };

  return (
    <div class="flex flex-col gap-4">
      <header class="flex justify-between">
        <div class="flex items-center gap-3 text-neutral-700">
          <button class="btn_icon" on:click={() => navigate(-1)}>
            <ArrowLeft height="20px" width="20px" />
          </button>
          <Show fallback={<p>...</p>} when={location()}>
            <h2 class="text-xl">{location()?.name}</h2>
          </Show>
        </div>
        <Show when={location()}>
          <Dialog open={isOpen()} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
            <Dialog.Trigger class="btn_primary">Add Location</Dialog.Trigger>
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
                      <Input label="Name" name="name" type="text" />
                      <Input
                        label="Start"
                        name="start_at"
                        type="date"
                        value={location()?.start_at || undefined}
                      />
                      <Input
                        label="End"
                        name="end_at"
                        type="date"
                        value={location()?.end_at || undefined}
                      />
                      <button
                        class="btn_primary"
                        disabled={isCreating()}
                        type="submit"
                      >
                        {isCreating() ? (
                          <span>Creating...</span>
                        ) : (
                          <span>Update</span>
                        )}
                      </button>
                    </form>
                  </div>
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          </Dialog>
        </Show>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <Show fallback={<p>Could not find trip.</p>} when={location()}>
          {(variable) => {
            return (
              <div>
                <h2>{variable().name}</h2>
              </div>
            );
          }}
        </Show>
      </Suspense>
    </div>
  );
};

export default LocationRoute;
