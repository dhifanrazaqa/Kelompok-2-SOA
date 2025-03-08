# Kelompok-2-SOA

## Note:
**[] = Placeholder**

## Case:  
Event Organizer Booking Application

## Application Name:
[Event Organizer] Web Application

## Members:  
2210511039 - Danendra Helmy Pratama  
2210511059 - Arvino Qiyamullail Ramli  
2210511091 - Dhi'Fan Razaqa  

**For detailed information about the project, check out our wiki [here](https://github.com/dhifanrazaqa/Kelompok-2-SOA/wiki)!**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dhifanrazaqa/Kelompok-2-SOA.git
   cd Kelompok-2-SOA
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your database credentials and other settings.

4. Generate Prisma client:

   ```bash
   npx prisma generate 
   ```

5. Run database migrations:
   ```bash
   npx prisma migrate dev --name "init"
