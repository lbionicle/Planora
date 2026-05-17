'use client';

import { MouseEvent, ReactNode, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useCreateOrganizerEventMutation,
  useDeleteOrganizerEventImageMutation,
  useGetOrganizerEventQuery,
  useUpdateOrganizerEventMutation,
  useUploadOrganizerEventImageMutation,
} from '@/entities/event/api/organizerEventsApi';
import {
  eventCategoryLabels,
  eventFormatLabels,
  eventStatusLabels,
  eventVisibilityLabels,
} from '@/entities/event/model/constants';
import { EventFormat, EventStatus } from '@/entities/event/model/types';
import {
  getEventFormValues,
  getEventPayload,
} from '@/features/organizerEvents/lib/eventForm';
import {
  EVENT_IMAGE_ALLOWED_TYPES,
  EVENT_IMAGE_MAX_SIZE_BYTES,
} from '@/features/organizerEvents/model/constants';
import {
  eventFormSchema,
  EventFormValues,
} from '@/features/organizerEvents/model/schemas';
import { getApiErrorMessage } from '@/shared/lib';
import ActionButtons from '@/shared/ui/ActionButtons';
import DateInput from '@/shared/ui/DateInput';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import Select, { SelectOption } from '@/shared/ui/Select';
import Textarea from '@/shared/ui/Textarea';

import EventImageSection from '../EventImageSection';
import * as S from './styled';

interface EventFormModalProps {
  isOpen: boolean;
  eventId?: string | null;
  onClose: () => void;
}

const EVENT_FORM_ID = 'event-form';

function getSelectOptions<TValue extends string>(
  labels: Record<TValue, string>,
): SelectOption[] {
  return Object.entries(labels).map(([value, label]) => ({
    value,
    label: label as string,
  }));
}

function getStatusOptions(isEditMode: boolean): SelectOption[] {
  const statuses = isEditMode
    ? Object.values(EventStatus)
    : [EventStatus.DRAFT, EventStatus.PUBLISHED];

  return statuses.map((status) => ({
    value: status,
    label: eventStatusLabels[status],
  }));
}

export default function EventFormModal({
  isOpen,
  eventId,
  onClose,
}: EventFormModalProps): ReactNode {
  const isEditMode = Boolean(eventId);

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isImageMarkedForDelete, setIsImageMarkedForDelete] = useState(false);

  const { data, isLoading } = useGetOrganizerEventQuery(eventId ?? '', {
    skip: !isOpen || !eventId,
  });

  const [createEvent, { isLoading: isCreating }] =
    useCreateOrganizerEventMutation();

  const [updateEvent, { isLoading: isUpdating }] =
    useUpdateOrganizerEventMutation();

  const [uploadImage, { isLoading: isImageUploading }] =
    useUploadOrganizerEventImageMutation();

  const [deleteImage, { isLoading: isImageDeleting }] =
    useDeleteOrganizerEventImageMutation();

  const event = data?.data;

  const formValues = useMemo(() => getEventFormValues(event), [event]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    values: formValues,
  });

  const currentFormat = useWatch({
    control,
    name: 'format',
  });

  const isOnline = currentFormat === EventFormat.ONLINE;

  const isSaving =
    isCreating || isUpdating || isImageUploading || isImageDeleting;

  const handleClose = (): void => {
    setSelectedImageFile(null);
    setIsImageMarkedForDelete(false);
    onClose();
  };

  const handleSelectImage = (file: File): void => {
    if (!EVENT_IMAGE_ALLOWED_TYPES.includes(file.type)) {
      toast.error('Допустимые форматы изображения: PNG, JPEG.');
      return;
    }

    if (file.size > EVENT_IMAGE_MAX_SIZE_BYTES) {
      toast.error('Размер изображения не должен превышать 8MB.');
      return;
    }

    setSelectedImageFile(file);
    setIsImageMarkedForDelete(false);
  };

  const handleDeleteImage = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();

    setSelectedImageFile(null);
    setIsImageMarkedForDelete(true);
  };

  const onSubmit = async (values: EventFormValues): Promise<void> => {
    try {
      const payload = getEventPayload(values);

      const response =
        isEditMode && eventId
          ? await updateEvent({ eventId, body: payload }).unwrap()
          : await createEvent(payload).unwrap();

      const savedEventId = response.data.id;

      if (selectedImageFile) {
        await uploadImage({
          eventId: savedEventId,
          image: selectedImageFile,
        }).unwrap();
      } else if (isImageMarkedForDelete && response.data.image_url) {
        await deleteImage(savedEventId).unwrap();
      }

      toast.success(
        isEditMode ? 'Мероприятие обновлено.' : 'Мероприятие создано.',
      );

      handleClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const statusOptions = useMemo(
    () => getStatusOptions(isEditMode),
    [isEditMode],
  );

  return (
    <Modal
      isOpen={isOpen}
      title={isEditMode ? 'Редактирование мероприятия' : 'Создание мероприятия'}
      size="lg"
      onClose={handleClose}
      footer={
        <ActionButtons
          primaryText={isEditMode ? 'Сохранить' : 'Создать'}
          secondaryText="Отменить"
          primaryType="submit"
          primaryForm={EVENT_FORM_ID}
          isLoading={isSaving}
          loadingText="Сохранение..."
          disabled={isLoading}
          onSecondaryClick={handleClose}
        />
      }
    >
      {isLoading && <S.Empty>Загрузка мероприятия...</S.Empty>}

      {!isLoading && (
        <S.Form id={EVENT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
          <EventImageSection
            imageUrl={event?.image_url}
            selectedFile={selectedImageFile}
            isMarkedForDelete={isImageMarkedForDelete}
            disabled={isSaving}
            onSelectFile={handleSelectImage}
            onDelete={handleDeleteImage}
          />

          <Input
            label="Название"
            placeholder="Введите название мероприятия"
            error={errors.title?.message}
            disabled={isSaving}
            {...register('title')}
          />

          <Textarea
            label="Описание"
            placeholder="Введите описание мероприятия"
            error={errors.description?.message}
            disabled={isSaving}
            {...register('description')}
          />

          <S.TwoColumns>
            <Select
              label="Категория"
              options={getSelectOptions(eventCategoryLabels)}
              error={errors.category?.message}
              disabled={isSaving}
              {...register('category')}
            />

            <Select
              label="Доступ"
              options={getSelectOptions(eventVisibilityLabels)}
              error={errors.visibility?.message}
              disabled={isSaving}
              {...register('visibility')}
            />
          </S.TwoColumns>

          <S.TwoColumns>
            <Select
              label="Формат"
              options={getSelectOptions(eventFormatLabels)}
              error={errors.format?.message}
              disabled={isSaving}
              {...register('format')}
            />

            <Select
              label="Статус"
              options={statusOptions}
              error={errors.status?.message}
              disabled={isSaving}
              {...register('status')}
            />
          </S.TwoColumns>

          <S.TwoColumns>
            <Controller
              control={control}
              name="starts_at"
              render={({ field }) => (
                <DateInput
                  mode="datetime-local"
                  label="Дата начала"
                  placeholder="Выберите дату начала"
                  value={field.value}
                  minDate={new Date()}
                  error={errors.starts_at?.message}
                  disabled={isSaving}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="ends_at"
              render={({ field }) => (
                <DateInput
                  mode="datetime-local"
                  label="Дата окончания"
                  placeholder="Выберите дату окончания"
                  value={field.value}
                  minDate={new Date()}
                  error={errors.ends_at?.message}
                  disabled={isSaving}
                  onChange={field.onChange}
                />
              )}
            />
          </S.TwoColumns>

          <Input
            label="Количество мест"
            placeholder="Введите количество мест"
            error={errors.tickets_count?.message}
            disabled={isSaving}
            {...register('tickets_count')}
          />

          {isOnline ? (
            <Input
              label="Ссылка на онлайн-мероприятие"
              placeholder="https://example.com/meeting"
              error={errors.online_url?.message}
              disabled={isSaving}
              {...register('online_url')}
            />
          ) : (
            <>
              <S.TwoColumns>
                <Input
                  label="Страна"
                  placeholder="Введите страну"
                  error={errors.country?.message}
                  disabled={isSaving}
                  {...register('country')}
                />

                <Input
                  label="Город"
                  placeholder="Введите город"
                  error={errors.city?.message}
                  disabled={isSaving}
                  {...register('city')}
                />
              </S.TwoColumns>

              <S.TwoColumns>
                <Input
                  label="Область"
                  placeholder="Введите область"
                  error={errors.region?.message}
                  disabled={isSaving}
                  {...register('region')}
                />

                <Input
                  label="Почтовый индекс"
                  placeholder="Введите индекс"
                  error={errors.postal_code?.message}
                  disabled={isSaving}
                  {...register('postal_code')}
                />
              </S.TwoColumns>

              <Input
                label="Адрес"
                placeholder="Введите адрес"
                error={errors.address?.message}
                disabled={isSaving}
                {...register('address')}
              />
            </>
          )}
        </S.Form>
      )}
    </Modal>
  );
}
