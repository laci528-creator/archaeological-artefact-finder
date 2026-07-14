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
        
        if (!object_id || !title) { 
            return res.status(400).json({ message: "Object ID and title are required." }); 
        } 
            
        const sql = ` INSERT INTO favorites 
        (object_id, title, image_url, culture, period, medium, object_url) VALUES (?, ?, ?, ?, ?, ?, ?) `; 
        

        await pool.query(sql, [ 
            object_id, 
            title, 
            image_url, 
            culture, 
            period, 
            medium, 
            object_url, 
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
    try { const id = req.params.id; 
        await pool.query("DELETE FROM favorites WHERE id = ?", [id]); 
        
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
        
        await pool.query("UPDATE favorites SET note = ? WHERE id = ?", [note, id]); 
        
        res.json({ message: "Note updated." }); 
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ message: "Could not update note." 

        }); 
    } 
}

