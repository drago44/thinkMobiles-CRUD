<script setup>
import { useUsersStore, useAlertStore, useEventsStore } from '@/stores';

const alertStore = useAlertStore();

const usersStore = useUsersStore();
const { user } = usersStore;

const eventsStore = useEventsStore();
const { createUserEvent } = eventsStore;

const eventSchema = ref({
  title_event: 'required|min:2|max:100',
  descr_event: 'required|min:2|max:100',
  start_data_event: 'required',
  end_data_event: 'required'
});

const createEvent = async (values) => {
  alertStore.wait('Please wait! We are add your event.');

  try {
    await createUserEvent(user._id, values);
  } catch (error) {
    alertStore.error(error);
    return;
  }

  alertStore.success('Success! Your event add!');
};
</script>

<template>
  <section class="event-add-form">
    <div class="event-add-form__container center">
      <BaseForm
        title="Create event"
        btn="Create new event"
        link="Return to events"
        :to="`/edit/${user._id}`"
        :validation-schema="eventSchema"
        @submit="createEvent"
      >
        <BaseField name="title_event" type="text" label="Title" placeholder="Event name" />
        <BaseField
          name="descr_event"
          as="textarea"
          label="Description"
          placeholder="Yor message..."
        />
        <BaseField name="start_data_event" type="date" label="Start Date" />
        <BaseField name="end_data_event" type="date" label="End Date" />
      </BaseForm>
    </div>
  </section>
</template>
