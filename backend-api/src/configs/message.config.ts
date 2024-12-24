import { UnprocessableEntityException } from '@nestjs/common';
import _ from 'lodash';

export const MessageResponse = (messageObj: any, locale: string) => {
    const message = _.get(messageObj, locale, _.get(messageObj, 'vi'));

    if (!message) {
        throw new UnprocessableEntityException(`Message for locale "${locale}" not found.`);
    }

    return message;
};

export const messages = {
    LOGIN: {
        vi: 'Bạn đã đăng nhập thành công',
        en: 'Login successfully'
    },
    WRONG_EMAIL_OR_PHONE: {
        vi: 'Sai email hoặc số điện thoại',
        en: 'Wrong email or phone'
    },
    WRONG_PASSWORD: {
        vi: 'Sai mật khẩu',
        en: 'Wrong password'
    },
    USER_EXISTED: {
        vi: 'Người dùng đã tồn tại',
        en: 'User existed'
    },
    INVALID_TOKEN: {
        vi: 'Token không hợp lệ',
        en: 'Invalid token'
    }
};
