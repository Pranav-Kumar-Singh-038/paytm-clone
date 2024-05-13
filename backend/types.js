const zod = require('zod');

const zodUser = zod.object(
    {
        username: zod.string().email(),
        password: zod.string().min(6),
        firstName: zod.string().max(50),
        lastName: zod.string().max(50)
    }
)

const zodUserin = zod.object(
    {
        username: zod.string().email(),
        password: zod.string().min(6),
    }
)

module.exports = {
    zodUser: zodUser,
    zodUserin: zodUserin
}