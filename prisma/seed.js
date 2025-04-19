const prisma = require("../src/config/database");

async function main() {
    // Seed Users
    await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            phone: "1234567890",
            address: "123 Main St",
            role: "PARTICIPANT",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            password: "password123",
            phone: "0987654321",
            address: "456 Elm St",
            role: "ORGANIZER",
        },
    });

    // Seed Organizer
    const organizer = await prisma.organizer.create({
        data: {
            userId: user2.id,
            organizationName: "Eventify",
            contactName: "Jane Smith",
            contactPhone: "0987654321",
            contactEmail: "jane.smith@example.com",
        },
    });

    // Seed Event
    const event = await prisma.event.create({
        data: {
            title: "Tech Conference 2025",
            type: "SEMINAR",
            target: "PUBLIC",
            budgetRange: "TEN_TO_TWENTY",
            organizerId: organizer.id,
            thumbnail: "https://example.com/thumbnail.jpg",
            description: "A conference about the latest in tech.",
            startDate: new Date("2023-11-01T09:00:00Z"),
            endDate: new Date("2023-11-01T17:00:00Z"),
            picName: "Jane Doe",
            picPhone: "628123456789",
            picEmail: "jane.doe@example.com",
            status: "CONCEPTING",
        },
    });

    // Seed Venue
    await prisma.venue.create({
        data: {
            eventId: event.id,
            name: "Tech Hall",
            address: "789 Tech St",
            city: "Tech City",
            capacity: 500,
            latitude: 37.7749,
            longitude: -122.4194,
        },
    });

    // Seed Tickets
    const tickets = await prisma.ticket.createMany({
        data: [
            {
                eventId: event.id,
                name: "General Admission",
                price: 400000,
                quota: 300,
                sold: 0,
            },
            {
                eventId: event.id,
                name: "VIP Admission",
                price: 100000,
                quota: 100,
                sold: 0,
            },
        ],
    });

    // Seed Checklist
    await prisma.checklist.createMany({
        data: [
            {
                eventId: event.id,
                title: "Book Venue",
                description: "Confirm venue booking for the event.",
                progress: 50,
            },
            {
                eventId: event.id,
                title: "Invite Speakers",
                description: "Send invitations to speakers.",
                progress: 30,
            },
        ],
    });

    // Seed Documents
    await prisma.document.createMany({
        data: [
            {
                eventId: event.id,
                name: "Event Proposal",
                url: "https://res.cloudinary.com/detxefhk2/image/upload/v1745025094/eoapp/qt6phyxxpidnjdrnnxww.pdf",
            },
            {
                eventId: event.id,
                name: "Budget Plan",
                url: "https://res.cloudinary.com/detxefhk2/image/upload/v1745025094/eoapp/qt6phyxxpidnjdrnnxww.pdf",
            },
        ],
    });

    // Seed OrderTicket
    const user1 = await prisma.user.findFirst({ where: { email: "john.doe@example.com" } });
    const ticket = await prisma.ticket.findFirst({ where: { eventId: event.id } });

    await prisma.orderTicket.create({
        data: {
            userId: user1.id,
            ticketId: ticket.id,
            eventId: event.id,
            quantity: 2,
            totalPrice: 800000,
            paymentStatus: "PAID",
            orderStatus: "CONFIRMED",
        },
    });

    // Seed OrderEvent
    await prisma.orderEvent.create({
        data: {
            userId: user1.id,
            eventId: event.id,
            title: "Tech Conference 2025",
            description: "Order for organize the tech conference.",
            totalPrice: 20000000,
            paymentStatus: "PAID",
            orderStatus: "CONFIRMED",
        },
    });

    console.log("Seeding completed successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });