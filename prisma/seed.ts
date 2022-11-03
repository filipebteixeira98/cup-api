import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatarUrl:
        'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Wayfarers&hatColor=Red&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Hearts&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Light',
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Winner Pool',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  // const participant = await prisma.participant.create({
  //   data: {
  //     userId: user.id,
  //     poolId: pool.id,
  //   },
  // })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  })
}

main()
