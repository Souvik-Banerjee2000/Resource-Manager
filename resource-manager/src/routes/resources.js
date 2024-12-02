const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();

//Create an user
router.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new resource
router.post("/", async (req, res) => {
  const { userId, resourceUrl, expirationTime } = req.body;

  try {
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Create the resource
    const resource = await prisma.resource.create({
      data: {
        userId,
        resourceUrl,
        expirationTime: new Date(expirationTime),
      },
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch resources with optional filters
router.get("/", async (req, res) => {
  const { userId, status } = req.query;

  try {
    const resources = await prisma.resource.findMany({
      where: {
        userId: parseInt(userId),
        ...(status && { status }),
      },
      orderBy: { createdAt: "desc" }, // Performance optimization
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Access a specific resource
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: parseInt(id) },
    });

    if (!resource || resource.status === "expired") {
      return res.status(404).json({ error: "Resource not found or expired" });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a resource
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.resource.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
