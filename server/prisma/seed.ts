import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/carloseduardobanjar.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,
        }
    })

    const participant = await prisma.participant.create({
        data: {
            poolId: pool.id,
            userId: user.id,
        }
    })

    await prisma.game.create({
        data: {
            date: '2023-02-27T12:00:00.377Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2023-02-28T12:00:00.377Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondtTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }

                    }
                }
            }
        }
    })

    
}

main()