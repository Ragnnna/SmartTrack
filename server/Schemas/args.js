const graphql = require('graphql')

const { GraphQLString, GraphQLBoolean } = graphql

const DOCTOR_FIELDS = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString },
  room: { type: GraphQLString },
  allerts: { type: GraphQLString },
  connected: { type: GraphQLBoolean },
}

const ALLERT_FIELDS = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  color: { type: GraphQLString },
  isActive: { type: GraphQLBoolean },
}

ALLERT_FIELDS_UPDATE = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  color: { type: GraphQLString },
}

const ALLERT_FIELDS_NO_ID = {
  title: { type: GraphQLString },
  color: { type: GraphQLString },
  isActive: { type: GraphQLBoolean },
}

const DOCTOR_FIELDS_UPDATE = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  phone: { type: GraphQLString },
  allerts: { type: GraphQLString },
  connected: { type: GraphQLBoolean }
}

const ROOM_FIELDS = {
  id: { type: GraphQLString },
  title: { type: GraphQLString },
  doctorName: { type: GraphQLString },
}

const ROOM_FIELDS_NO_ID = {
  title: { type: GraphQLString },
  doctorName: { type: GraphQLString },
}

const RECEPTIONIST_FIELDS_UPDATE = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  phone: { type: GraphQLString }
}

const ASSISTANTE_FIELDS_UPDATE = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  phone: { type: GraphQLString },
}

const ASSISTANTE_FIELDS = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString },
}

const RECEPTIONIST_FIELDS = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString }
}

const ADMIN_FIELDS_NO_ID = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString },
}

const ADMIN_FIELDS = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString },
}

const DOCTOR_FIELDS_NO_ID = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString },
  room: { type: GraphQLString },
  allerts: { type: GraphQLString },
  connected: { type: GraphQLBoolean }
}

const ASSISTANTE_FIELDS_NO_ID = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString },
}

const RECEPTIONIST_FIELDS_NO_ID = {
  name: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString },
  phone: { type: GraphQLString }
}

module.exports = {
  DOCTOR_FIELDS,
  ASSISTANTE_FIELDS,
  RECEPTIONIST_FIELDS,
  RECEPTIONIST_FIELDS_NO_ID,
  ASSISTANTE_FIELDS_NO_ID,
  DOCTOR_FIELDS_NO_ID,
  DOCTOR_FIELDS_UPDATE,
  RECEPTIONIST_FIELDS_UPDATE,
  ASSISTANTE_FIELDS_UPDATE,
  ADMIN_FIELDS,
  ADMIN_FIELDS_NO_ID,
  ALLERT_FIELDS,
  ALLERT_FIELDS_NO_ID,
  ALLERT_FIELDS_UPDATE,
  ROOM_FIELDS,
  ROOM_FIELDS_NO_ID
}