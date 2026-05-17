function getFileNameFromHeaders(response: Response): string {
  const contentDisposition = response.headers.get('content-disposition');

  if (!contentDisposition) {
    return 'verification-file';
  }

  const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);

  return fileNameMatch?.[1] ?? 'verification-file';
}

export async function downloadRequestFile(requestId: string): Promise<void> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const response = await fetch(
    `${apiBaseUrl}/admin/organizer-applications/${requestId}/file`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Не удалось скачать файл.');
  }

  const blob = await response.blob();
  const fileName = getFileNameFromHeaders(response);

  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = fileName;
  link.click();

  window.URL.revokeObjectURL(objectUrl);
}
