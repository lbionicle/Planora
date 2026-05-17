import { UserRole } from '@/entities/user/model/types';
import { ProfileFormValues } from '@/features/profile/model/schemas';
import { UpdateProfileRequest } from '@/features/profile/model/types';

interface GetProfileFormValuesParams {
  role?: UserRole;
  email?: string;
  participantFirstName?: string;
  participantLastName?: string;
  companyName?: string;
}

export function getProfileFormValues({
  role,
  email,
  participantFirstName,
  participantLastName,
  companyName,
}: GetProfileFormValuesParams): ProfileFormValues {
  if (role === UserRole.PARTICIPANT) {
    return {
      email: email ?? '',
      first_name: participantFirstName ?? '',
      last_name: participantLastName ?? '',
      company_name: '',
      current_password: '',
      new_password: '',
    };
  }

  if (role === UserRole.ORGANIZER) {
    return {
      email: email ?? '',
      first_name: '',
      last_name: '',
      company_name: companyName ?? '',
      current_password: '',
      new_password: '',
    };
  }

  return {
    email: email ?? '',
    first_name: '',
    last_name: '',
    company_name: '',
    current_password: '',
    new_password: '',
  };
}

export function getProfilePayload(
  role: UserRole,
  values: ProfileFormValues,
): UpdateProfileRequest {
  if (role === UserRole.PARTICIPANT) {
    return {
      first_name: values.first_name,
      last_name: values.last_name,
    };
  }

  if (role === UserRole.ORGANIZER) {
    return {
      company_name: values.company_name,
    };
  }

  return {};
}

export function hasPasswordChanges(values: ProfileFormValues): boolean {
  return Boolean(values.new_password?.trim());
}
