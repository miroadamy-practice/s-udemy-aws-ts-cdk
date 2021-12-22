const spacesUrl = 'https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/';

export const config = {
    REGION: 'eu-central-1',
    USER_POOL_ID: 'eu-central-1_RsHsBNMan',
    APP_CLIENT_ID: '6hkmkdf2j11ft5potp0paoqo1p',
    IDENTITY_POOL_ID: 'eu-central-1:51711005-da04-4a95-9154-96c73393713f',
    TEST_USER_NAME: 'test_user',
    TEST_USER_PASSWORD: 'Qwerty123!',
    SPACES_PHOTOS_BUCKET: 'spaces-photos061d7a8cfc38',
    api: {
        baseUrl: spacesUrl,
        spacesUrl: `${spacesUrl}spaces`
    }
}