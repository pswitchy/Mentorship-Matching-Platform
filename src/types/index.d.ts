import { ZodIssue } from 'zod';

type ActionResult<T> =
    { status: 'success', data: T } | { status: 'error', error: string | ZodIssue[] }

type MessageDto = {
    id: string;
    text: string;
    created: string;
    dateRead: string | null;
    senderId?: string;
    senderName?: string;
    senderImage?: string | null;
    recipientId?: string;
    recipientName?: string;
    recipientImage?: string | null
}

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
    select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
            select: { userId, name, image }
        },
        recipient: {
            select: { userId, name, image }
        }
    }
}>

type UserFilters = {
    ageRange: number[];
    gender: string[];
    orderBy: string;
    withPhoto: boolean;
}

type PaginatedResponse<T> = {
    items: T[];
    totalCount: number;
}

type PagingParams = {
    pageNumber: number;
    pageSize: number;
}

type PagingResult = {
    totalPages: number;
    totalCount: number;
} & PagingParams

type GetMemberParams = {
    ageRange?: string;
    gender?: string;
    orderBy?: string;
    withPhoto?: string;
    pageNumber?: string;
    pageSize?: string;
}