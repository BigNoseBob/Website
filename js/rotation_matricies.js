// Oliver Rayner
// November 2022

// Rotation Matricies

function rotation_matrixX(point, angle) {
    const x = point.x || 0 
    const y = point.y || 0
    const z = point.z || 0

    point.y =  Math.cos(angle) * y + Math.sin(angle) * z
    point.z = -Math.sin(angle) * y + Math.cos(angle) * z
}

function rotation_matrixY(point, angle) {
    const x = point.x || 0 
    const y = point.y || 0
    const z = point.z || 0

    point.x =  Math.cos(angle) * x + Math.sin(angle) * z
    point.z = -Math.sin(angle) * x + Math.cos(angle) * z
}

function rotation_matrixZ(point, angle) {
    const x = point.x || 0 
    const y = point.y || 0
    const z = point.z || 0

    point.x =  Math.cos(angle) * x + Math.sin(angle) * y
    point.y = -Math.sin(angle) * x + Math.cos(angle) * y
}

const rotation_matricies = {
    "X": rotation_matrixX,
    "Y": rotation_matrixY,
    "Z": rotation_matrixZ,
}

export function rotate_points(points, angle, plane="Y") {
    for (const point of points) {
        rotation_matricies[plane](point, angle)
    }
}