import {defineStorage} from '@aws-amplify/backend';


export const storage = defineStorage({
    name: 'jelliciousAssets',
    access: allow => ({
        'images/*': [
            allow.guest.to(['read']),
            allow.groups(['admins']).to(['read', 'write', 'delete'])
        ],
        'products-list/*': [
            allow.guest.to(['read']),
            allow.groups(['admins']).to(['read', 'write', 'delete'])
        ]
    })
});