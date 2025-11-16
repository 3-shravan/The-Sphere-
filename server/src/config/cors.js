const whitelist = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const socketCorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
};

export const socketCore = {
  cors: socketCorsOptions,
};
