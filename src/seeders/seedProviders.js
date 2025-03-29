import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';


const providers = Array.from({ length: 10 }, (_, index) => ({
  name: `Provider ${index + 1}`,
  email: `provider${index + 1}@example.com`,
  password: '123456', // Default password
  role: 'provider',
}));

const seedProviders = async () => {
  try {

    const existingProviders = await UserModel.find({ role: 'provider' });
    if (existingProviders.length > 0) {
      console.log('Providers already exist. Seeding skipped.');
      return;
    }

    const hashedProviders = await Promise.all(
      providers.map(async (provider) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(provider.password, salt);
        return { ...provider, password: hashedPassword };
      })
    );
    await UserModel.insertMany(hashedProviders);
    console.log('10 providers seeded successfully.');
  } catch (error) {
    console.error('Error seeding providers:', error);
  } finally {
  }
};

export default seedProviders;
