/* eslint-disable no-extend-native */
import { fake } from 'faker'
import {
  prisma,
  User,
  UserCreateInput,
  Grid,
  GridCreateInput,
  GridEntryCreateInput,
  GridEntryCreateWithoutGridInput
} from '../src/generated/prisma-client'
import 'colors'

// type GetRandom<T> = (arr: T[]) => T

// const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const usersa = [
  {
    firstName: 'Bobby',
    lastName: 'Bob',
    username: 'bigbob',
    phoneNumber: 1234567890,
    email: 'bob@bob.com',
    password: 'test'
  },
  {
    firstName: 'Freddy',
    lastName: 'Fred',
    username: 'bigfred',
    phoneNumber: 1234567890,
    email: 'fred@fred.com',
    password: 'test'
  }
]

function newArray<T>(length: number, val: T): T[] {
  if (typeof val === 'function')
    return new Array(length).fill(null).map(val as any)
  return new Array(length).fill(null).map(() => val)
}

const createFakeGrid = (user) => {
  const entries = newArray(3, {
    type: 'Column',
    amount: '1',
    unit: 'fr',
    author: {
      connect: user
    }
  })

  return {
    name: fake(`{{lorem.words}}`)
    // entries: {
    //   create: entries
    // }
  }
}

const createFakeUser = (): UserCreateInput => ({
  firstName: fake(`{{name.firstName}}`),
  lastName: fake(`{{name.lastName}}`),
  username: fake(`{{internet.userName}}`),
  phoneNumber: fake(`{{phone.phoneNumber}}`),
  email: fake(`{{internet.email}}`),
  password: 'test'
})

const fakeUsers = newArray(10, createFakeUser())

console.table(fakeUsers)

const entries = [
  {
    id: '1',
    type: 'Column',
    amount: '1',
    unit: 'fr'
  },
  {
    id: '2',
    type: 'Column',
    amount: '1',
    unit: 'fr'
  },
  {
    id: '3',
    type: 'Column',
    amount: '1',
    unit: 'fr'
  }
]

const garrett: UserCreateInput = {
  id: '1',
  firstName: 'Garrett',
  lastName: 'Weems',
  username: 'glweems1',
  phoneNumber: '4693468234',
  email: 'gwgraphicdesign1@gmail.com',
  password: 'test',
  grids: {
    create: {
      id: '1',
      name: 'Garrett Grid One'
    }
  }
}

const seed = async () => {
  const count = 0
  const usersCreated = []

  await prisma.createUser(garrett)
  /* try {
    await fakeUsers.map(async (fakeUser) => {
      const user = await prisma.createUser(fakeUser)

      const grid = createFakeGrid(user)
      await prisma.createGrid(grid)
    })

    console.log('Users Created', usersCreated)
  } catch (err) {
    console.error('seed error', err)
  } */
}

seed()

/* const users: UserCreateInput[] = new Array(50).fill(null).map(() => ({
  firstName: fake(`{{name.firstName}}`),
  lastName: fake(`{{name.lastName}}`),
  username: fake(`{{internet.userName}}`),
  phoneNumber: fake(`{{phone.phoneNumber}}`),
  email: fake(`{{internet.email}}`),
  password: 'test',
  grids: {
    create: [
      {
        name: fake(`{{lorem.words}}`),
        entries: [
          { type: 'Column', amount: '1', unit: 'fr' },
          { type: 'Column', amount: '1', unit: 'fr' },
          { type: 'Column', amount: '1', unit: 'fr' },
          { type: 'Column', amount: '1', unit: 'fr' },
          { type: 'Column', amount: '1', unit: 'fr' }
        ]
      }
    ]
  }
}))
 */
/*   await createdUsers.forEach(async (userCreated) => {
      const grid = { name: fake(`{{lorem.words}}`) }
      await prisma.createGrid(grid).then(async (createdGrid) => {
        await prisma
          .createGridEntry({
            type: 'Column',
            amount: '1',
            unit: 'fr',
            author: {
              connect: {
                email: fakeUser.email,
                username: fakeUser.username
              }
            }
          })
          .then(({ id }) => {
            prisma.updateGrid({
              where: { id },
              data: { entries: [createdGridEntry] }
            })
          })
      })
    }) */
