import { A } from "@solidjs/router";
import { For, Show, Suspense, createResource } from "solid-js";

import getTrips from "../api/trips/getTrips";
import Button from "../components/Button";
import UpdateTripDialogButton from "../modals/UpdateTripDialogButton/UpdateTripDialogButton";

const HomeRoute = () => {
  const [trips, { refetch }] = createResource(getTrips);

  return (
    <div class="flex flex-col gap-3">
      <header>
        <UpdateTripDialogButton
          onUpdated={() => refetch()}
          triggerButton={
            <Button as="span" variant="primary">
              Create Trip
            </Button>
          }
        />
      </header>
      <div class="grow">
        <Suspense fallback={<p>Loading...</p>}>
          <Show when={trips()}>
            {(variable) => {
              return (
                <Show
                  fallback={<p>You don't have any trips</p>}
                  when={variable().length > 0}
                >
                  <ul>
                    <For each={trips()}>
                      {({ id, title }) => {
                        return (
                          <li>
                            <A href={`trips/${id}`}>{title}</A>
                          </li>
                        );
                      }}
                    </For>
                  </ul>
                </Show>
              );
            }}
          </Show>
        </Suspense>
      </div>
    </div>
  );
};

export default HomeRoute;
