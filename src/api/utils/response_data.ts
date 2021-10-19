'use strict';

import Response_data from '../types/Response_data';

export default function response_data(): Response_data {
    return {
        message: 'Success',
        status: 200,
        result: null
    }
}