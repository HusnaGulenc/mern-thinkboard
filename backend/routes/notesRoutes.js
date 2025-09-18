import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

/**
 * @openapi
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     responses:
 *       200:
 *         description: Success fetching all notes
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first note"
 *               content:
 *                 type: string
 *                 example: "This is the content of the note"
 *     responses:
 *       201:
 *         description: Created note successfully!
 *       400:
 *         description: Bad request (missing title or content)
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/notes/{id}:
 *   get:
 *     summary: Get a specific note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note fetching successfully.
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated note title"
 *               content:
 *                 type: string
 *                 example: "updated note content"
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: Note updated successfully.
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully.
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */

router.get("/", async (req, res) => {
  //this route for getting notes
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  //this route for getting notes
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" })
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    ); // new:true for the updated doc
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found!!!" });
    res.json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
