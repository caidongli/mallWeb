import ajax from '@/utils/ajax'

export const getAttachment = data => ajax('/admin/file/getAttachment', data, 'GET');

export const downloadAttachment = data => ajax('/admin/file/downloadAttachment', data, 'POST',JSON);

export const deleteAttachment = data => ajax('/admin/file/deleteAttachment', data, 'POST',JSON);

export const uploadAttachment = data => ajax('/admin/file/uploadAttachment', data, 'POST',JSON);

export const attachDownload = data => ajax('/admin/file/attachDownload', data, 'POST',JSON);

export const selectAttachmentByObjId = data => ajax('/admin/file/selectAttachmentByObjId', data, 'POST',JSON);
