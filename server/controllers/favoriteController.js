import pool from "../db/connection.js"; 


export async function getFavorites(req, res) { 
    try { 
        const [rows] = await pool.query( 
            "SELECT * FROM favorites ORDER BY created_at DESC" 
        ); 
        
        res.json(rows); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ message: "Could not load favorites." 
        }); 
    } 
}

export async function addFavorite(req, res) { 
    try { 
        const { 
            object_id, 
            title, 
            image_url, 
            culture, 
            period, 
            medium, 
            object_url, 
        } = req.body; 
        
        if (!object_id || !/^\d+$/.test(String(object_id))) {
        return res.status(400).json({
            message: "Valid object ID is required.",
        });
        }
            
        const sql = ` INSERT INTO favorites 
        (object_id, title, image_url, culture, period, medium, object_url) VALUES (?, ?, ?, ?, ?, ?, ?) `; 
        
        const safeTitle = (typeof title === "string" ? title.trim() : "") || "Untitled artefact";

        await pool.query(sql, [ 
            object_id, 
            safeTitle, 
            image_url ?? null,
            culture ?? null,
            period ?? null,
            medium ?? null,
            object_url ?? null,
        ]); 
        res.status(201).json({ message: "Artefact saved as favorite." }); 
    } catch (error) { 
        console.error(error); 
        if (error.code === "ER_DUP_ENTRY") { 
            return res.status(409).json({ message: "Artefact is already saved." }); 
        } 
        res.status(500).json({ message: "Could not save favorite." }); 
    } 
}


export async function deleteFavorite(req, res) { 
    try { 
        const id = req.params.id; 

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid favorite ID.",
            });
        }

        const [result] = await pool.query("DELETE FROM favorites WHERE id = ?", [id]); 

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Favorite not found.",
            });
        }
        
        res.json({ message: "Favorite deleted." 
        }); 

    } catch (error) { 
        console.error(error); 
        res.status(500).json({ 
            message: "Could not delete favorite." 
        
        }); 
    } 
}


export async function updateFavoriteNote(req, res) { 
    try { 
        const id = req.params.id; 
        const { note } = req.body; 

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "Invalid favorite ID.",
            });
        }
        
        if (typeof note !== "string") {
            return res.status(400).json({
                message: "Note must be a string.",
            });
        }

        const [result] = await pool.query("UPDATE favorites SET note = ? WHERE id = ?", [note, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Favorite not found.",
            });
        }
        
        res.json({ message: "Note updated." }); 
    } catch (error) { 
        console.error(error); 

        res.status(500).json({ message: "Could not update note." 
        }); 
    } 
}

