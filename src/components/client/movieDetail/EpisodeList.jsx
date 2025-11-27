// components/EpisodeList.jsx
import React from "react";

export default function EpisodeList({ episodes, onClick }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {episodes.map((server, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg font-medium mb-2">{server.server_name}</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {server.server_data.map((ep, idx) => (
                            <button
                                key={idx}
                                onClick={() => onClick(server.server_name, ep)}
                                className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-sm"
                            >
                                {ep.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
