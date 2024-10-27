import { A, useNavigate, useParams } from "@solidjs/router";
import { Show, Suspense, createResource } from "solid-js";

import deleteTrip from "../../api/trips/deleteTrip";
import deleteTripLocation from "../../api/trips/deleteTripLocation";
import getTrip from "../../api/trips/getTrip";
import Button from "../../components/Button";
import ArrowLeft from "../../icons/ArrowLeft";
import UpdateLocationDialog from "../../modals/UpdateLocationDialog/UpdateLocationDialog";
import UpdateTripDialogButton from "../../modals/UpdateTripDialogButton/UpdateTripDialogButton";
import { Location, Trip } from "../../types";
import formatDate from "../../utils/formatDate";

const TripRoute = () => {
  const params = useParams();

  if (!params.tripId) {
    return null;
  }

  const [trip, { refetch }] = createResource(params.tripId, getTrip);
  const navigate = useNavigate();

  const onDeleteLocation = async (location: Location) => {
    await deleteTripLocation(location);

    refetch();
  };

  const onDeleteTrip = async (trip: Trip) => {
    await deleteTrip(trip);

    navigate("/");
  };

  return (
    <div class="flex flex-col gap-4">
      <header class="flex justify-between">
        <div class="flex items-center gap-3 text-neutral-700">
          <Button on:click={() => navigate(-1)} variant="icon">
            <ArrowLeft height="20px" width="20px" />
          </Button>
          <Show fallback={<p>...</p>} when={trip()}>
            <h2 class="text-xl">{trip()?.title}</h2>
          </Show>
        </div>
        <Show when={trip()}>
          {(variable) => {
            return (
              <div class="flex gap-5">
                <Button on:click={() => onDeleteTrip(variable())}>
                  Delete Trip
                </Button>
                <UpdateTripDialogButton
                  onUpdated={() => refetch()}
                  triggerButton={<Button as="span">Update Trip</Button>}
                  trip={variable()}
                />
                <UpdateLocationDialog
                  onCreated={() => refetch()}
                  trip={variable()}
                />
              </div>
            );
          }}
        </Show>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <Show fallback={<p>Could not find trip.</p>} when={trip()}>
          {(variable) => {
            return (
              <Show
                fallback={<p>You don't have any locations.</p>}
                when={variable().locations.length > 0}
              >
                <ul class="flex flex-col flex-wrap gap-5">
                  {trip()?.locations.map((location) => {
                    return (
                      <li class="flex flex-col gap-2">
                        <div class="flex items-center gap-2">
                          <div class="h-3 w-3 rounded-full bg-lime-600" />
                          {formatDate(location.start_at)} -{" "}
                          {formatDate(location.end_at)}
                        </div>
                        <div class="ml-5 flex border border-neutral-200 py-3 pl-6 pr-3 text-lg text-neutral-600">
                          <div class="flex grow items-center">
                            <A href={`locations/${location.id}`}>
                              {location.name}
                            </A>
                          </div>
                          <div class="flex gap-1">
                            <Button on:click={() => onDeleteLocation(location)}>
                              Delete
                            </Button>
                            <Button>Edit</Button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Show>
            );
          }}
        </Show>
      </Suspense>
    </div>
  );
};

export default TripRoute;
