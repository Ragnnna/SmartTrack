const graphql = require('graphql')
const Doctor = require('./Doctor')
const Assistante = require('./Assistante')
const Receptionist = require('./Receptionist')
const Admin = require('./Admin')
const Room = require('./Room')

const {
  DOCTOR_FIELDS, 
  RECEPTIONIST_FIELDS, 
  ASSISTANTE_FIELDS, 
  DOCTOR_FIELDS_NO_ID, 
  ASSISTANTE_FIELDS_NO_ID, 
  RECEPTIONIST_FIELDS_NO_ID, 
  DOCTOR_FIELDS_UPDATE,
  RECEPTIONIST_FIELDS_UPDATE,
  ASSISTANTE_FIELDS_UPDATE,
  ADMIN_FIELDS,
  ADMIN_FIELDS_NO_ID,
  ALLERT_FIELDS,
  ALLERT_FIELDS_NO_ID,
  ROOM_FIELDS,
  ROOM_FIELDS_NO_ID
} = require('./args')
const Allert = require('./Allert')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql

const RoomType = new GraphQLObjectType({
  name: 'Room',
  fields: () => (ROOM_FIELDS)
})

const DoctorType = new GraphQLObjectType({
  name: 'Doctor',
  fields: () => (DOCTOR_FIELDS)
})


const AdminType = new GraphQLObjectType({
  name: 'Admin',
  fields: () => (ADMIN_FIELDS)
})

const AssistanteType = new GraphQLObjectType({
  name: 'Assistante',
  fields: () => (ASSISTANTE_FIELDS)
})

const ReceptionistType = new GraphQLObjectType({
  name: 'Receptionist',
  fields: () => (RECEPTIONIST_FIELDS)
})

const AllertType = new GraphQLObjectType({
  name: 'Allert',
  fields: () => (ALLERT_FIELDS)
})

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addDoctor: {
      type: DoctorType,
      args: DOCTOR_FIELDS_NO_ID,
      resolve(parent, args){
        const newDoctor = new Doctor({
          name: args.name,
          email: args.email,
          password: args.password,
          phone: args.phone,
          room: args.room,
          allerts: args.allerts,
          connected: args.connected
        })
        return newDoctor.save()
      }
    },
    addRoom: {
      type: RoomType,
      args: ROOM_FIELDS,
      resolve(parent, args){
        const newRoom = new Room({
          title: args.title,
          doctorName: args.doctorName
        })
        return newRoom.save()
      }
    },
    addAllert: {
      type: AllertType,
      args: ALLERT_FIELDS_NO_ID,
      resolve(parent, args){
        const newAllert = new Allert({
          title: args.title,
          color: args.color,
          isActive: args.isActive
        })
        return newAllert.save()
      }
    },
    addAssistante: {
      type: AssistanteType,
      args: ASSISTANTE_FIELDS_NO_ID,
      resolve(parent, args){
        const newAssistante = new Assistante({
          name: args.name,
          email: args.email,
          password: args.password,
          phone: args.phone
        })
        return newAssistante.save()
      }
    },
    addAdmin: {
      type: AdminType,
      args: ADMIN_FIELDS_NO_ID,
      resolve(parent, args){
        const newAdmin = new Admin({
          name: args.name,
          email: args.email,
          password: args.password,
          phone: args.phone
        })
        return newAdmin.save()
      }
    },
    addRooms: {
      type: RoomType,
      args: { rooms: { type: GraphQLString } },
      resolve(parent, args){
        const roomList = JSON.parse(args.rooms)
        Room.deleteMany({ doctorName : "" }, (err, res) => {
        })
        return Room.insertMany(roomList.map(el => {
          return {
            title: el.title,
            doctorName: el.doctorName
          }
        }))
      }
    },
    addiReceptionist: {
      type: ReceptionistType,
      args: RECEPTIONIST_FIELDS_NO_ID,
      resolve(parent, args){
        const newReceptionist = new Receptionist({
          name: args.name,
          email: args.email,
          password: args.password,
          phone: args.phone
        })
        return newReceptionist.save()
      }
    },
    addAllert: {
      type: AllertType,
      args: ALLERT_FIELDS_NO_ID,
      resolve(parent, args){
        const newAllert = new Allert({
          title: args.title,
          color: args.color,
          isActive: false
        })
        return newAllert.save()
      }
    },
    deleteDoctor: {
      type: DoctorType,
      args: {
        id : { type: GraphQLString }
      },
      resolve(parent, args){
        return Doctor.findByIdAndRemove(args.id)
      }
    },
    deleteRoom: {
      type: RoomType,
      args: {
        id : { type: GraphQLString }
      },
      resolve(parent, args){
        return Room.findByIdAndRemove(args.id)
      }
    },
    deleteRoomsAfterDoctor: {
      type: RoomType,
      args: {
        doctorName : { type: GraphQLString }
      },
      resolve(parent, args){
        return Room.deleteMany({ doctorName : args.doctorName }, (err, res) => {
      })
      }
    },
    deleteAssistant: {
      type: AssistanteType,
      args: {
        id : { type: GraphQLString }
      },
      resolve(parent, args){
        return Assistante.findByIdAndRemove(args.id)
      }
    },
    deleteReceptionist: {
      type: ReceptionistType,
      args: {
        id : { type: GraphQLString }
      },
      resolve(parent, args){
        return Receptionist.findByIdAndRemove(args.id)
      }
    },
    updateDoctor: {
      type: DoctorType,
      args: DOCTOR_FIELDS_UPDATE,
      resolve(parent, args){
        return Doctor.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, email: args.email, phone: args.phone, allerts: args.allerts }},
          { new: true },
        )
      }
    },
    updateDoctorConnection: {
      type: DoctorType,
      args: DOCTOR_FIELDS_UPDATE,
      resolve(parent, args){
        return Doctor.findByIdAndUpdate(
          args.id,
          { $set: { connected: args.connected }},
          { new: true },
        )
      }
    },
    updateRoomDoctorName: {
      type: RoomType,
      args: ROOM_FIELDS,
      resolve(parent, args){
        console.log(args)
        return Room.updateOne(
          { title: args.title },
          { "$set": { doctorName: args.doctorName } }
        )
      }
    },
    setRoomDoctorName: {
      type: RoomType,
      args: ROOM_FIELDS,
      resolve(parent, args){
        return Room.updateMany(
          { doctorName: args.doctorName }, 
          { "$set": { doctorName: "" }}
        )
      }
    },
    updateDoctorAllerts: {
      type: DoctorType,
      args: DOCTOR_FIELDS,
      resolve(parent, args){
        return Doctor.updateOne(
          { email: args.email },
          { "$set": { allerts: args.allerts }}
        )
      }
    },
    updateRooms: {
      type: RoomType,
      args: ROOM_FIELDS,
      resolve(parent, args){
        return Room.updateMany(
          { title: args.title },
          { "$set": { doctorName: args.doctorName } }
        )
      }
    },
    updateDoctorRooms: {
      type: DoctorType,
      args: DOCTOR_FIELDS,
      resolve(parent, args){
        return Doctor.findOneAndUpdate
        ({
          name: args.name
        }, 
        {
          "$set": { room: args.room }
        }
        )
      }
    },
    updateAssistante: {
      type: AssistanteType,
      args: ASSISTANTE_FIELDS_UPDATE,
      resolve(parent, args){
        return Assistante.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, email: args.email, phone: args.phone }},
          { new: true },
        )
      }
    },
    updateReceptionist: {
      type: ReceptionistType  ,
      args: RECEPTIONIST_FIELDS_UPDATE,
      resolve(parent, args){
        return Receptionist.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, email: args.email, phone: args.phone }},
          { new: true },
        )
      }
    },
    updateRoom: {
      type: RoomType,
      args: ROOM_FIELDS,
      resolve(parent, args){
        return Room.findByIdAndUpdate(
          args.id,
          { $set: { title: args.title, doctorName: args.doctorName }},
          { new: true },
        )
      }
    },
    updateAllert: {
      type: AllertType,
      args: ALLERT_FIELDS_UPDATE,
      resolve(parent, args){
        return Allert.findByIdAndUpdate(
          args.id,
          { color: args.color, title: args.title },
          { new: true }
        )
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    doctor: {
      type: DoctorType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve(parent, args){
        return Doctor.findOne({ email: args.email })
      }
    },
    doctorRoom: {
      type: DoctorType,
      args: { name: { type: GraphQLString } },
      resolve(parent, args){
        return Doctor.findOne({ name: args.name })
      }
    },
    doctorByEmail: {
      type: DoctorType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args){
        return Doctor.findOne({ email: args.email })
      }
    },
    doctorById: {
      type: DoctorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        return Doctor.findById(args.id)
      }
    },
    assistant: {
      type: AssistanteType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString }  },
      resolve(parent, args){
        return Assistante.findOne({ email: args.email })
      }
    },
    admin: {
      type: AdminType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString }  },
      resolve(parent, args){
        return Admin.findOne({ email: args.email })
      }
    },
    receptionist: {
      type: ReceptionistType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString }  },
      resolve(parent, args){
        return Receptionist.findOne({ email: args.email })
      }
    },
    allerts: {
      type: GraphQLList(AllertType),
      resolve(){
        const newAllerts = Allert.find()
        return newAllerts
      }
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      resolve(parent, args){
        const newDoctors = Doctor.find()
        return newDoctors
      }
    },
    assistantes: {
      type: new GraphQLList(AssistanteType),
      resolve(parent, args){
        const newAssistantes = Assistante.find()
        return newAssistantes
      }
    },
    receptionists: {
      type: new GraphQLList(ReceptionistType),
      resolve(parent, args){
        const newReceptionists = Receptionist.find()
        return newReceptionists
      }
    },
    rooms: {
      type: new GraphQLList(RoomType),
      resolve(){
        const newRooms = Room.find()
        return newRooms
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutations
})