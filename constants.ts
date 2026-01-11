
import type { Match } from './types';

export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export const FIXTURE: Match[] = [
    // Grupo A
    { id: 1, group: 'A', home: 'Mexico', away: 'Sudáfrica', date: '11-Jun' },
    { id: 2, group: 'A', home: 'Corea del Sur', away: 'Playoff-UEFA-D', date: '11-Jun' },
    { id: 3, group: 'A', home: 'Sudáfrica', away: 'Playoff-UEFA-D', date: '16-Jun' },
    { id: 4, group: 'A', home: 'Mexico', away: 'Corea del Sur', date: '16-Jun' },
    { id: 5, group: 'A', home: 'Corea del Sur', away: 'Sudáfrica', date: '21-Jun' },
    { id: 6, group: 'A', home: 'Playoff-UEFA-D', away: 'Mexico', date: '21-Jun' },
    // Grupo B
    { id: 7, group: 'B', home: 'Canadá', away: 'Playoff-UEFA-A', date: '12-Jun' },
    { id: 8, group: 'B', home: 'Qatar', away: 'Suiza', date: '12-Jun' },
    { id: 9, group: 'B', home: 'Suiza', away: 'Playoff-UEFA-A', date: '17-Jun' },
    { id: 10, group: 'B', home: 'Canadá', away: 'Qatar', date: '17-Jun' },
    { id: 11, group: 'B', home: 'Suiza', away: 'Canadá', date: '22-Jun' },
    { id: 12, group: 'B', home: 'Playoff-UEFA-A', away: 'Qatar', date: '22-Jun' },
    // Grupo C
    { id: 13, group: 'C', home: 'Brasil', away: 'Marruecos', date: '12-Jun' },
    { id: 14, group: 'C', home: 'Haití', away: 'Escocia', date: '12-Jun' },
    { id: 15, group: 'C', home: 'Brasil', away: 'Haití', date: '17-Jun' },
    { id: 16, group: 'C', home: 'Escocia', away: 'Marruecos', date: '17-Jun' },
    { id: 17, group: 'C', home: 'Escocia', away: 'Brasil', date: '22-Jun' },
    { id: 18, group: 'C', home: 'Marruecos', away: 'Haití', date: '22-Jun' },
    // Grupo D
    { id: 19, group: 'D', home: 'USA', away: 'Paraguay', date: '13-Jun' },
    { id: 20, group: 'D', home: 'Australia', away: 'Playoff-UEFA-C', date: '13-Jun' },
    { id: 21, group: 'D', home: 'USA', away: 'Australia', date: '18-Jun' },
    { id: 22, group: 'D', home: 'Playoff-UEFA-C', away: 'Paraguay', date: '18-Jun' },
    { id: 23, group: 'D', home: 'Playoff-UEFA-C', away: 'USA', date: '23-Jun' },
    { id: 24, group: 'D', home: 'Paraguay', away: 'Australia', date: '23-Jun' },
    // Grupo E
    { id: 25, group: 'E', home: 'Alemania', away: 'Curazao', date: '13-Jun' },
    { id: 26, group: 'E', home: 'Costa de Marfil', away: 'Ecuador', date: '13-Jun' },
    { id: 27, group: 'E', home: 'Alemania', away: 'Costa de Marfil', date: '18-Jun' },
    { id: 28, group: 'E', home: 'Ecuador', away: 'Curazao', date: '18-Jun' },
    { id: 29, group: 'E', home: 'Ecuador', away: 'Alemania', date: '23-Jun' },
    { id: 30, group: 'E', home: 'Curazao', away: 'Costa de Marfil', date: '23-Jun' },
    // Grupo F
    { id: 31, group: 'F', home: 'Países Bajos', away: 'Japón', date: '14-Jun' },
    { id: 32, group: 'F', home: 'Playoff-UEFA-B', away: 'Túnez', date: '14-Jun' },
    { id: 33, group: 'F', home: 'Países Bajos', away: 'Playoff-UEFA-B', date: '19-Jun' },
    { id: 34, group: 'F', home: 'Túnez', away: 'Japón', date: '19-Jun' },
    { id: 35, group: 'F', home: 'Túnez', away: 'Países Bajos', date: '24-Jun' },
    { id: 36, group: 'F', home: 'Japón', away: 'Playoff-UEFA-B', date: '24-Jun' },
    // Grupo G
    { id: 37, group: 'G', home: 'Bélgica', away: 'Egipto', date: '14-Jun' },
    { id: 38, group: 'G', home: 'Irán', away: 'Nueva Zelanda', date: '14-Jun' },
    { id: 39, group: 'G', home: 'Bélgica', away: 'Irán', date: '19-Jun' },
    { id: 40, group: 'G', home: 'Nueva Zelanda', away: 'Egipto', date: '19-Jun' },
    { id: 41, group: 'G', home: 'Nueva Zelanda', away: 'Bélgica', date: '24-Jun' },
    { id: 42, group: 'G', home: 'Egipto', away: 'Irán', date: '24-Jun' },
    // Grupo H
    { id: 43, group: 'H', home: 'España', away: 'Cabo Verde', date: '15-Jun' },
    { id: 44, group: 'H', home: 'Arabia Saudita', away: 'Uruguay', date: '15-Jun' },
    { id: 45, group: 'H', home: 'España', away: 'Arabia Saudita', date: '20-Jun' },
    { id: 46, group: 'H', home: 'Uruguay', away: 'Cabo Verde', date: '20-Jun' },
    { id: 47, group: 'H', home: 'Uruguay', away: 'España', date: '25-Jun' },
    { id: 48, group: 'H', home: 'Cabo Verde', away: 'Arabia Saudita', date: '25-Jun' },
    // Grupo I
    { id: 49, group: 'I', home: 'Francia', away: 'Senegal', date: '15-Jun' },
    { id: 50, group: 'I', home: 'Playoff-Inter-2', away: 'Noruega', date: '15-Jun' },
    { id: 51, group: 'I', home: 'Francia', away: 'Playoff-Inter-2', date: '20-Jun' },
    { id: 52, group: 'I', home: 'Noruega', away: 'Senegal', date: '20-Jun' },
    { id: 53, group: 'I', home: 'Noruega', away: 'Francia', date: '25-Jun' },
    { id: 54, group: 'I', home: 'Senegal', away: 'Playoff-Inter-2', date: '25-Jun' },
    // Grupo J
    { id: 55, group: 'J', home: 'Argentina', away: 'Argelia', date: '15-Jun' },
    { id: 56, group: 'J', home: 'Austria', away: 'Jordania', date: '15-Jun' },
    { id: 57, group: 'J', home: 'Argentina', away: 'Austria', date: '20-Jun' },
    { id: 58, group: 'J', home: 'Jordania', away: 'Argelia', date: '20-Jun' },
    { id: 59, group: 'J', home: 'Jordania', away: 'Argentina', date: '25-Jun' },
    { id: 60, group: 'J', home: 'Argelia', away: 'Austria', date: '25-Jun' },
    // Grupo K
    { id: 61, group: 'K', home: 'Portugal', away: 'Playoff-Inter-1', date: '16-Jun' },
    { id: 62, group: 'K', home: 'Uzbekistán', away: 'Colombia', date: '16-Jun' },
    { id: 63, group: 'K', home: 'Portugal', away: 'Uzbekistán', date: '21-Jun' },
    { id: 64, group: 'K', home: 'Colombia', away: 'Playoff-Inter-1', date: '21-Jun' },
    { id: 65, group: 'K', home: 'Colombia', away: 'Portugal', date: '26-Jun' },
    { id: 66, group: 'K', home: 'Playoff-Inter-1', away: 'Uzbekistán', date: '26-Jun' },
    // Grupo L
    { id: 67, group: 'L', home: 'Inglaterra', away: 'Croacia', date: '16-Jun' },
    { id: 68, group: 'L', home: 'Ghana', away: 'Panamá', date: '16-Jun' },
    { id: 69, group: 'L', home: 'Inglaterra', away: 'Ghana', date: '21-Jun' },
    { id: 70, group: 'L', home: 'Panamá', away: 'Croacia', date: '21-Jun' },
    { id: 71, group: 'L', home: 'Panamá', away: 'Inglaterra', date: '26-Jun' },
    { id: 72, group: 'L', home: 'Croacia', away: 'Ghana', date: '26-Jun' },
];
