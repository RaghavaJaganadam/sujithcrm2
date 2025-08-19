import mongoose from 'mongoose';
import Lead from './models/Lead.js';

await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crm');

const leads = [
  {
    company: 'Tech Innovations Inc',
    contact: 'John Smith',
    status: 'qualified',
    value: 25000,
    lastActivity: '2 hours ago'
  },
  {
    company: 'Global Solutions Ltd',
    contact: 'Sarah Johnson',
    status: 'proposal',
    value: 45000,
    lastActivity: '4 hours ago'
  },
  {
    company: 'harsha Ventures',
    contact: 'Mike Wilson',
    status: 'won',
    value: 15000,
    lastActivity: '1 day ago'
  },  
  {
    company: 'NextGen Software',
    contact: 'Olivia Davis',
    status: 'qualified',
    value: 28000,
    lastActivity: '5 hours ago'
  }, 
  {
    company: 'UrbanSky Media',
    contact: 'Noah Wilson',
    status: 'won',
    value: 50000,
    lastActivity: '2 weeks ago'
  },
  {
    company: 'BrightPath Consulting',
    contact: 'Sophia Martinez',
    status: 'lost',
    value: 10000,
    lastActivity: '4 days ago'
  },
  {
    id: '7',
    company: 'Skyline Ventures',
    contact: 'James Anderson',
    status: 'qualified',
    value: 40000,
    lastActivity: '1 week ago'
  },
  {
    id: '8',
    company: 'EverGreen Retail',
    contact: 'Isabella Thomas',
    status: 'proposal',
    value: 27000,
    lastActivity: '6 hours ago'
  },
  {
    id: '9',
    company: 'FusionTech Corp',
    contact: 'William Taylor',
    status: 'new',
    value: 13000,
    lastActivity: '3 hours ago'
  },
  {
    id: '10',
    company: 'NovaEdge Solutions',
    contact: 'Mia Moore',
    status: 'qualified',
    value: 35000,
    lastActivity: '2 days ago'
  },
  {
    id: '11',
    company: 'Zenith Systems',
    contact: 'Benjamin White',
    status: 'won',
    value: 60000,
    lastActivity: '5 days ago'
  },
  {
    id: '12',
    company: 'AlphaCore Industries',
    contact: 'Charlotte Harris',
    status: 'proposal',
    value: 22000,
    lastActivity: '8 hours ago'
  },
  {
    id: '13',
    company: 'CrestWave Digital',
    contact: 'Lucas Martin',
    status: 'lost',
    value: 9000,
    lastActivity: '4 weeks ago'
  },
  {
    id: '14',
    company: 'OptiMax Services',
    contact: 'Amelia Clark',
    status: 'qualified',
    value: 29000,
    lastActivity: '1 day ago'
  },
  {
    id: '15',
    company: 'PeakPoint Marketing',
    contact: 'Henry Lewis',
    status: 'new',
    value: 14000,
    lastActivity: '9 hours ago'
  },
  {
    id: '16',
    company: 'SilverLine Logistics',
    contact: 'Evelyn Hall',
    status: 'won',
    value: 48000,
    lastActivity: '3 weeks ago'
  },
  {
    id: '17',
    company: 'BrightFuture Enterprises',
    contact: 'Alexander Young',
    status: 'proposal',
    value: 26000,
    lastActivity: '12 hours ago'
  },
  {
    id: '18',
    company: 'Vertex Financial',
    contact: 'Harper King',
    status: 'qualified',
    value: 31000,
    lastActivity: '2 days ago'
  },
  {
    id: '19',
    company: 'CrystalClear IT',
    contact: 'Daniel Wright',
    status: 'lost',
    value: 11000,
    lastActivity: '6 days ago'
  },
  {
    id: '20',
    company: 'TrueNorth Solutions',
    contact: 'Ella Scott',
    status: 'new',
    value: 17000,
    lastActivity: '7 hours ago'
  }
];

await Lead.deleteMany({});
await Lead.insertMany(leads);
console.log('Leads seeded!');
process.exit();
